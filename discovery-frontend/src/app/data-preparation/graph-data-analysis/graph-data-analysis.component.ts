import {Component, ElementRef, Injector, OnDestroy, OnInit} from '@angular/core';
import {MomentDatePipe} from '../../common/pipe/moment.date.pipe';
import {AbstractComponent} from "../../common/component/abstract.component";
import {CmType} from '../../domain/data-preparation/pr-graph-data-analysis';
import {DataconnectionService} from '../../dataconnection/service/dataconnection.service';
import {Link, Node} from './d3';
import APP_CONFIG from './graph-data-analysis.config';
import * as _ from "lodash";

@Component({
  selector: 'app-graph-data-analysis',
  templateUrl: './graph-data-analysis.component.html',
  providers: [MomentDatePipe]
})
export class GraphDataAnalysisComponent extends AbstractComponent implements OnInit, OnDestroy {
  nodes: Node[] = [];
  links: Link[] = [];

  public clusteringMethods: ClusteringMethod[];

  public cmType : CmType;

  constructor(private connectionService: DataconnectionService,
              protected elementRef: ElementRef,
              protected injector: Injector) {
    super(elementRef, injector);
    const N = APP_CONFIG.N,
      getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      let u = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
      this.nodes.push(new Node(i,u));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
    this.connectionService.getDataconnections({type: 'jdbc'}, 'forSimpleListView').then((result) => {
      // if exist preset list
      if (result['_embedded']) {
        console.log(result['_embedded'].connections);
      }
      // page
      this.pageResult = result['page'];
      // loading hide
      this.loadingHide();
    })
    //
    // console.log(this.links)
    console.log(this.nodes)
  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Override Method
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // Init
  public ngOnInit() {
    // Init
    super.ngOnInit();

    this._initClusteringMethods();
  }

  // Destroy
  public ngOnDestroy() {
    super.ngOnDestroy();
  }

  // Инициализация методов кластеризации
  private _initClusteringMethods() {
    this.clusteringMethods = [
      { label: "NO", value: null },
      { label: "SCC", value: CmType.SCC }
    ]
  }

  public onChangeClusteringMethod(data: ClusteringMethod) {

    this.cmType = data.value;

    this.reloadPage();
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
