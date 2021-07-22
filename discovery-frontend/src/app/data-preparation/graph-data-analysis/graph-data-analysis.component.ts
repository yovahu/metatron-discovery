import {Component, ElementRef, Injector, OnDestroy, OnInit} from '@angular/core';
import {MomentDatePipe} from '../../common/pipe/moment.date.pipe';
import {AbstractComponent} from "../../common/component/abstract.component";
import {CmType, RType, SpType} from '../../domain/data-preparation/pr-graph-data-analysis';
import {DataconnectionService} from '../../dataconnection/service/dataconnection.service';
import {Link, Node} from './d3';

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
  public rType: RType;

  public currentDB : string;
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
    await this.connectionService.getGraphNodes(this.currentDB).then(async (result)=>{
       await result['nodes'].forEach(e => {
        let node = JSON.parse(e);
        this.nodes.push(new Node(node._id, node._labels[0], node.graph))
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
    })
    console.log(this.nodes)
  }

  public onChangeShortestPathMethod(data: ShortestPathMethod) {
    this.spType = data.value;
    console.log(this.nodes[3].color);
    this.nodes[3].graph = 8;
    this.nodes[15].graph = 8;
    this.nodes[0].graph = 8;
    this.nodes[1].graph = 8;
    this.nodes[2].graph = 8;
    this.nodes[16].graph = 8;
    this.nodes[25].graph = 8;
    this.nodes[12].graph = 8;
    this.nodes[13].graph = 8;
    this.nodes[14].graph = 8;
    this.nodes[10].graph = 8;
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
      this.nodes.forEach(e => e.cluster = null);
    }

    if (this.cmType === 'SCC') {
      this.connectionService.getClustersScc(this.currentDB).then((result)=>{

        let response = result['scc'].map(e => {
          return JSON.parse(e)
        });

        setClusterNullForSoloNode(response);
        setClusterNode(this.nodes, response);

      })

    }
  }

  public async onChangeCurrentDB(data: {label: string; value: string;}) {
    this.currentDB = data.value;
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
