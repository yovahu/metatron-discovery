import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:defs>
      <svg:marker [attr.id]="'arrowhead' + link.source.id + link.target.id" viewBox="0 -5 10 10" [attr.refX]="link.target.radius + 10" refY="0" orient="auto"
              markerWidth="20" markerHeight="20" markerUnits="strokeWidth" overflow="visible">
        <svg:path d="M0,-5L10,0L0,5" fill="#ccc"></svg:path>
      </svg:marker>
    </svg:defs>
    <svg:line
        class="link"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
        [attr.marker-end]="'url(#arrowhead' + link.source.id + link.target.id +')'"
    >
    </svg:line>
    <svg:text
      [attr.x]="link.source.x + (link.target.x - link.source.x) * 0.5"
      [attr.y]="link.source.y + (link.target.y - link.source.y) * 0.5"
      text-anchor="middle"
      dy=".25em"
    >
    </svg:text>

  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}
