import {Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MomentDatePipe} from '../../common/pipe/moment.date.pipe';
import {AbstractComponent} from "../../common/component/abstract.component";

@Component({
  selector: 'app-graph-data-analysis',
  templateUrl: './graph-data-analysis.component.html',
  providers: [MomentDatePipe]
})
export class GraphDataAnalysisComponent extends AbstractComponent implements OnInit, OnDestroy {
  // 생성자
  constructor(protected elementRef: ElementRef,
              protected injector: Injector) {
    super(elementRef, injector);
  }

  /*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  | Override Method
  |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

  // Init
  public ngOnInit() {
    // Init
    super.ngOnInit();
  }

  // Destroy
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
}
