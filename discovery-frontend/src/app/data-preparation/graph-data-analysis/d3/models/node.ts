import APP_CONFIG from '../../graph-data-analysis.config';
import * as d3 from 'd3';

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string | number;
  nodeClass: string;
  name: string;
  radius: number = 50;
  graph: string | number;

  cluster: number = null;
  spPath: number = null;

  colorInd: number = null;

  linkCount: number = 0;

  constructor(id, name, nodeClass, graph) {
    this.id = id;
    this.name = name;
    this.nodeClass = nodeClass;
    this.graph = graph;
  }

  normal = () => {
    return Math.sqrt(this.radius / APP_CONFIG.N);
  }

  get graphNumber() {
    return this.graph;
  }

  get r() {
    return this.radius;
  }

  get uds() {
    return 30;
  }

  get fontSize() {
    // return (30 * this.normal() + 10) + 'px';
    return 25 * this.normal() + 'px';
  }

  get color() {
    if(this.cluster !== null) {
      this.colorInd = this.cluster;
    }
    return APP_CONFIG.SPECTRUM[this.colorInd];
  }

  set color(col) {
    this.colorInd = APP_CONFIG.SPECTRUM[col];
  }
}
