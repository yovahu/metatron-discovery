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
  graph: string | number;

  cluster: number = null;
  spPath: number;

  linkCount: number = 0;

  constructor(id, nodeClass, graph) {
    this.id = id;
    this.nodeClass = nodeClass;
    this.graph = graph;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get graphNumber() {
    return this.graph;
  }

  get r() {
    // return this.linkCount * 30;
    return 30;
  }

  get uds() {
    return 30;
  }

  get fontSize() {
    // return (30 * this.normal() + 10) + 'px';
    return 20;
  }

  get color() {
    let index = this.cluster;
    return APP_CONFIG.SPECTRUM[index];
  }
}
