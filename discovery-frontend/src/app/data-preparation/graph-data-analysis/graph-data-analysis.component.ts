import {Component, ElementRef, Injector, OnDestroy, OnInit} from '@angular/core';
import {MomentDatePipe} from '../../common/pipe/moment.date.pipe';
import {AbstractComponent} from "../../common/component/abstract.component";
import {CmType, RType, SpType} from '../../domain/data-preparation/pr-graph-data-analysis';
import {DataconnectionService} from '../../dataconnection/service/dataconnection.service';
import {Link, Node} from './d3';
import {Alert} from "../../common/util/alert.util";

@Component({
  selector: 'app-graph-data-analysis',
  templateUrl: './graph-data-analysis.component.html',
  providers: [MomentDatePipe]
})
export class GraphDataAnalysisComponent extends AbstractComponent implements OnInit, OnDestroy {
  nodes: Node[] = [];
  links: Link[] = [];

  public clusteringMethods: ClusteringMethod[];
  public shortestPathMethods: ShortestPathMethod[];
  public rangingMethods: RangingMethods[];
  public dbList = [{ label: "Не выбрано", value: null }];

  public cmType : string;
  public spType: SpType;
  public rType: string;

  public currentDB : {label: string, value: string} = {label: '', value: ''};
  public countNodes : string = '';
  public countLinks : string = '';
  public dbSelected : boolean = false;

  constructor(private connectionService: DataconnectionService,
              protected elementRef: ElementRef,
              protected injector: Injector) {
    super(elementRef, injector);

    this.loadingHide();
  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Override Method
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // Init
  public ngOnInit() {
    // Init
    super.ngOnInit();

    this._initClusteringMethods();

    this._initShortestPathMethods();

    this._initRangingMethods();

    this._initDBList();
  }

  // Destroy
  public ngOnDestroy() {
    super.ngOnDestroy();
  }

  // Инициализация методов кластеризации
  private _initClusteringMethods() {
    this.clusteringMethods = [
      { label: "Не выбрано", value: null },
      { label: "SCC", value: CmType.SCC }
    ]
  }

  private _initShortestPathMethods() {
    this.shortestPathMethods = [
      { label: "Не выбрано", value: null },
      { label: "Дейкстры", value: SpType.dijkstra }
    ]
  }

  private _initRangingMethods() {
    this.rangingMethods = [
      { label: "Не выбрано", value: null },
      { label: "Pagerank", value: RType.pagerank }
    ]
  }

  // Список графовых БД
  private _initDBList() {
    this.connectionService.getDataconnections({type: 'jdbc', connection: {implementor: 'NEO4J'}}, 'forSimpleListView').then((result) => {
      let connList = [];
      // if exist preset list
      if (result['_embedded']) {
        connList = result['_embedded'].connections;
        connList.forEach(e => this.dbList.push({ label: e.name, value: e.id }));
      }
      // page
      this.pageResult = result['page'];

    })
  }

  public async getGraphNodes() {
    await this.connectionService.getGraphNodes(this.currentDB.value).then(async (result)=>{
       await result['nodes'].forEach(e => {
        let node = JSON.parse(e);
        this.nodes.push(new Node(node._id, node.name, node._labels[0], node.graph))
      })
      result['links'].forEach(e => {
        let link = JSON.parse(e);
        this.links.push(new Link(link._startId, link._endId, link.graph))
        this.nodes.map(e => {
          if(e.id === link._startId) {
            e.linkCount++;
          }
        })
      })
      this.countNodes = result['countNodes'];
      this.countLinks = result['countLinks'];
    })
  }

  public lol(){
    this.loadingShow();
    setTimeout(() => {
      this.loadingHide();
      Alert.success("Результаты сохранены")
    },1000)
  }

  public onChangeRangingMethods(data: RangingMethods) {
    this.rType = data.label;
    if (this.rType === 'Не выбрано') {
      this.nodes.forEach(e => e.radius = 50);
    } else {
      this.connectionService.getPagerank(this.currentDB.value).then((result)=>{
        let response = result['pagerank'].map(e => {
          return JSON.parse(e)
        });
        response.forEach(e => {
          this.nodes.forEach(n => {
            if(e.nodeId === n.id){
              n.radius = (e.score / 3 + 1) * 25;
            }
          })
        })
      });
    }
  }

  public onChangeShortestPathMethod(data: ShortestPathMethod) {
    Alert.info("Выберите пару вершин")
  }

  public onChangeClusteringMethod(data: ClusteringMethod) {
    this.cmType = data.label;

    function setClusterNullForSoloNode(response) {
      let response2 = response;
      response.map(e => {
        let counter = 0;
        response2.forEach(c => {
          if (e.cluster === c.cluster){
            counter ++;
          }
        })
        if(counter < 2) {
          return e.cluster = null;
        }
      })
    }

    function setClusterNode(nodes, response) {
      let prev = response[0].cluster;
      let p = 0;

      for (let i = 0; i < response.length; i++) {

        if (prev !== response[i].cluster){
          p++;
        }

        nodes.forEach(e => {
          if (e.id === response[i].nodeId) {
            if(response[i].cluster != null){
              e.cluster = p;
            }
            prev = response[i].cluster;
          }
        })

      }
    }

    if (this.cmType === 'Не выбрано') {
      this.nodes.forEach(e => {
        e.cluster = null
        e.colorInd = null
      });
    }

    if (this.cmType === 'SCC') {
      this.connectionService.getClustersScc(this.currentDB.value).then((result)=>{

        let response = result['scc'].map(e => {
          return JSON.parse(e)
        });

        setClusterNullForSoloNode(response);
        setClusterNode(this.nodes, response);

      })

    }
  }

  public async onChangeCurrentDB(data: {label: string, value: string}) {
    this.currentDB = {label: data.label, value: data.value};
    if(data.value === null) {
      alert(1);
    } else {
      this.loadingShow();
      await this.getGraphNodes();
      this.loadingHide();
      this.dbSelected = true;
    }
  }

  public reloadPage(isFirstPage: boolean = true) {
    (isFirstPage) && (this.page.page = 0);
    this.router.navigate(
      [this.router.url.replace(/\?.*/gi, '')],
    ).then();
  }
}

class ClusteringMethod {
  public label: string;
  public value: CmType;
}

class ShortestPathMethod {
  public label: string;
  public value: SpType;
}

class RangingMethods {
  public label: string;
  public value: RType;
}
