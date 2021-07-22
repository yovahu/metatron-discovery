import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  HostListener, Injector,
  Input,
  OnInit, SimpleChanges,
} from '@angular/core';
import {D3Service, ForceDirectedGraph} from '../../d3';
import {AbstractComponent} from "../../../../common/component/abstract.component";
import * as d3 from "d3";

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
<!--        <defs>-->
<!--          <marker id="arrowhead" viewBox="0 -5 10 10" refX="40" refY="0" orient="auto"-->
<!--          markerWidth="20" markerHeight="20" markerUnits="strokeWidth" overflow="visible">-->
<!--            <path d="M0,-5L10,0L0,5" fill="#ccc"></path>-->
<!--          </marker>-->
<!--        </defs>-->
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
            [draggableNode]="node" [draggableInGraph]="graph"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent extends AbstractComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes;
  @Input('links') links;
  @Input('cmType') cmType;
  @Input('rType') rType;

  graph: ForceDirectedGraph;
  _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  nodeR(d){
    return this.nodes[d.target].radius + 10;
  }

  constructor(private d3Service: D3Service, protected injector: Injector,  protected elementRef: ElementRef, private ref: ChangeDetectorRef) {
    super(elementRef, injector);
  }

  ngOnChanges(changes: SimpleChanges) {

    if(this.graph != null) {

      this.graph.updateGraph();

    }

  }

  ngOnInit() {
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth - 180,
      height: window.innerHeight - 270
    };
  }
}
