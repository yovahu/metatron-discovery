/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, ElementRef, Injector} from '@angular/core';
import {AbstractComponent} from '@common/component/abstract.component';

@Component({
  selector: 'component-logical-name-layer',
  templateUrl: 'logical-name-layer.component.html'
})
export class LogicalNameLayerComponent extends AbstractComponent {
  constructor(protected element: ElementRef,
              protected injector: Injector) {
    super(element, injector);
  }
}
