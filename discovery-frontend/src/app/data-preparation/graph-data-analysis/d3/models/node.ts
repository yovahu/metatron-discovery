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

  id: string;
  group: string;
  linkCount: number = 0;

  constructor(id, group) {
    this.id = id;
    this.group = group;
  }

  normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }

  get r() {
    // return 50 * this.normal() + 10;
    return 30;
  }

  get fontSize() {
    // return (30 * this.normal() + 10) + 'px';
    return 20;
  }

  get color() {
    let index = this.group;
    return APP_CONFIG.SPECTRUM[index];
  }
}
