import { Component, Input } from '@angular/core';
import { Link } from '../../../d3';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:line
        class="link"
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
        marker-end="url(#arrowhead)"
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
