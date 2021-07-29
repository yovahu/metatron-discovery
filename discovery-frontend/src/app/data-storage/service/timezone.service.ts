/*
 *
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

import * as _ from 'lodash';
import {Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StringUtil} from '@common/util/string.util';
import {FieldFormat} from '@domain/datasource/datasource';

declare let moment: any;

@Injectable()
export class TimezoneService {

  constructor(protected injector: Injector) {
    this._translateService = injector.get(TranslateService);
    // init
    this._initTimeZoneList();
    this._initBrowserTimezone();
  }

  // if not used TIMEZONE, set this key in timeZone property
  public static readonly DISABLE_TIMEZONE_KEY = 'DISABLE_ZONE';

  private _translateService: TranslateService;

  private _timeZoneList: TimeZoneObject[];

  private _browserTimezone: TimeZoneObject;

  public readonly browserLocale: string = moment.locale();

  /**
   * Get time zone list
   * @return {TimeZoneObject[]}
   */
  public getTimezoneList(): TimeZoneObject[] {
    return _.cloneDeep(this._timeZoneList);
  }

  /**
   * Get browser timezone
   * @return {TimeZoneObject}
   * @constructor
   */
  public getBrowserTimezone(): TimeZoneObject {
    return _.cloneDeep(this._browserTimezone);
  }

  /**
   * Get searched timezone list
   * @param {string} searchKeyword
   * @return {TimeZoneObject[]}
   */
  public getSearchedTimezoneList(searchKeyword: string): TimeZoneObject[] {
    return StringUtil.isEmpty(searchKeyword) ? this.getTimezoneList() : this.getTimezoneList().filter(timezone => timezone.label.toUpperCase().includes(searchKeyword.toUpperCase()));
  }

  /**
   * Get timezone object
   * @param {FieldFormat} format
   * @return {TimeZoneObject}
   */
  public getTimezoneObject(format: FieldFormat): TimeZoneObject {
    return format && format.timeZone ? (this.getTimezoneList().find(timezone => timezone.momentName === format.timeZone) || this.getBrowserTimezone()) : this.getBrowserTimezone();
  }

  /**
   * Get converted timezone UTC label
   * @param {string} utc
   * @return {string}
   */
  public getConvertedTimezoneUTCLabel(utc: string): string {
    let result = `UTC${utc.slice(0, 1)}${Number(utc.slice(1, 3))}`;
    if (utc.slice(4, 6) !== '00') {
      result += utc.slice(3, 6);
    }
    return result;
  }

  /**
   * Is enable timezone in date format
   * @param {FieldFormat} format
   * @return {boolean}
   */
  public isEnableTimezoneInDateFormat(format: FieldFormat): boolean {
    return format && format.format && format.format.toUpperCase().indexOf('H') !== -1;
  }

  /**
   * Timezone label builder
   * @private
   */
  private _timeZoneLabelBuilder(): void {
    this._timeZoneList.forEach((timezone) => {
      timezone.label = `${timezone.utc} `;
      timezone.city && (timezone.label += timezone.city + '/');
      timezone.country && (timezone.label += timezone.country + '/');
      timezone.continent && (timezone.label += timezone.continent);
    });
  }

  /**
   * Init browser timezone
   * @private
   */
  private _initBrowserTimezone(): void {
    this._browserTimezone = this._timeZoneList.find(timezoneObject => timezoneObject.momentName.indexOf(moment.tz.guess(true)) !== -1) || this._timeZoneList[0];
  }

  /**
   * Init timezone list
   * @private
   */
  private _initTimeZoneList(): void {
    // set timezone list
    this._timeZoneList = [
      {
        utc: '-11:00',
        momentName: 'Pacific/Midway',
        city: this._translateService.instant('msg.storage.ui.timezone.city.midway'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states-minor'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-11:00',
        momentName: 'Pacific/Niue',
        city: this._translateService.instant('msg.storage.ui.timezone.city.niue'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.niue'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-11:00',
        momentName: 'Pacific/Pago_Pago',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pago-page'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.american-samoa'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-11:00',
        momentName: 'Pacific/Samoa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.samoa'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-11:00',
        momentName: 'US/Samoa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.samoa'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-10:00',
        momentName: 'America/Adak',
        city: this._translateService.instant('msg.storage.ui.timezone.city.adak'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-10:00',
        momentName: 'America/Atka',
        city: this._translateService.instant('msg.storage.ui.timezone.city.atka'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-10:00',
        momentName: 'Pacific/Honolulu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.honolulu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-10:00',
        momentName: 'Pacific/Johnston',
        city: this._translateService.instant('msg.storage.ui.timezone.city.johnston'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-10:00',
        momentName: 'Pacific/Rarotonga',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rarotonga'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cook'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-10:00',
        momentName: 'Pacific/Tahiti',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tahiti'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.french-polynesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-10:00',
        momentName: 'US/Aleutian',
        city: this._translateService.instant('msg.storage.ui.timezone.city.aleutian'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-10:00',
        momentName: 'US/Hawaii',
        city: this._translateService.instant('msg.storage.ui.timezone.city.hawaii'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-10:00',
        momentName: 'HST',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.HST')
      },
      {
        utc: '-09:30',
        momentName: 'Pacific/Marquesas',
        city: this._translateService.instant('msg.storage.ui.timezone.city.marquesas'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.french-polynesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-09:00',
        momentName: 'America/Anchorage',
        city: this._translateService.instant('msg.storage.ui.timezone.city.anchorage'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-09:00',
        momentName: 'America/Juneau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.juneau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-09:00',
        momentName: 'America/Metlakatla',
        city: this._translateService.instant('msg.storage.ui.timezone.city.metlakatla'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-09:00',
        momentName: 'America/Nome',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nome'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-09:00',
        momentName: 'America/Sitka',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sitka'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-09:00',
        momentName: 'America/Yakutat',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yakutat'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-09:00',
        momentName: 'America/Gambier',
        city: this._translateService.instant('msg.storage.ui.timezone.city.gambier'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.french-polynesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-09:00',
        momentName: 'US/Alaska',
        city: this._translateService.instant('msg.storage.ui.timezone.city.alaska'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-08:00',
        momentName: 'America/Dawson',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dawson'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'America/Ensenada',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ensenada'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'America/Los_Angeles',
        city: this._translateService.instant('msg.storage.ui.timezone.city.los-angeles'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'America/Santa_Isabel',
        city: this._translateService.instant('msg.storage.ui.timezone.city.santa-isabel'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'America/Tijuana',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tijuana'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'America/Vancouver',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vancouver'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'America/Whitehorse',
        city: this._translateService.instant('msg.storage.ui.timezone.city.whitehorse'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-08:00',
        momentName: 'Canada/Pacific',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pacific'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-08:00',
        momentName: 'Canada/Yukon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yukon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-08:00',
        momentName: 'Mexico/BajaNorte',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bajanorte'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-08:00',
        momentName: 'Pacific/Pitcairn',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pitcairn'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.pitcairn'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-08:00',
        momentName: 'US/Pacific',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pacific'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-08:00',
        momentName: 'US/Pacific-New',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pacific-new'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-08:00',
        momentName: 'PST8PDT',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.PST8PDT')
      },
      {
        utc: '-07:00',
        momentName: 'America/Boise',
        city: this._translateService.instant('msg.storage.ui.timezone.city.boise'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Cambridge_Bay',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cambridge-bay'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Chihuahua',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chihuahua'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Creston',
        city: this._translateService.instant('msg.storage.ui.timezone.city.creston'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Dawson_Creek',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dawson-creek'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Denver',
        city: this._translateService.instant('msg.storage.ui.timezone.city.denver'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Edmonton',
        city: this._translateService.instant('msg.storage.ui.timezone.city.edmonton'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Fort_Nelson',
        city: this._translateService.instant('msg.storage.ui.timezone.city.fort-nelson'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Hermosillo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.hermosillo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Inuvik',
        city: this._translateService.instant('msg.storage.ui.timezone.city.inuvik'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Mazatlan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mazatlan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Ojinaga',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ojinaga'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Phoenix',
        city: this._translateService.instant('msg.storage.ui.timezone.city.phoenix'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Shiprock',
        city: this._translateService.instant('msg.storage.ui.timezone.city.shiprock'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'America/Yellowknife',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yellowknife'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-07:00',
        momentName: 'Canada/Mountain',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mountain'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-07:00',
        momentName: 'Mexico/BajaSur',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bajasur'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.mexico')
      },
      {
        utc: '-07:00',
        momentName: 'US/Arizona',
        city: this._translateService.instant('msg.storage.ui.timezone.city.arizona'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-07:00',
        momentName: 'US/Mountain',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mountain'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-07:00',
        momentName: 'MST',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.MST')
      },
      {
        utc: '-07:00',
        momentName: 'MST7MDT',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.MST7MDT')
      },
      {
        utc: '-07:00',
        momentName: 'Navajo',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.navajo')
      },
      {
        utc: '-06:00',
        momentName: 'America/Bahia_Banderas',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bahia-banderas'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Belize',
        city: this._translateService.instant('msg.storage.ui.timezone.city.belize'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.belize'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Chicago',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chicago'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Costa_Rica',
        city: this._translateService.instant('msg.storage.ui.timezone.city.costa-rica'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.costa-rica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/El_Salvador',
        city: this._translateService.instant('msg.storage.ui.timezone.city.el-salvador'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.el-salvador'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Guatemala',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guatemala'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guatemala'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Indiana/Knox',
        city: this._translateService.instant('msg.storage.ui.timezone.city.knox'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Indiana/Tell_City',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tell-city'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Indiana/Knox_IN',
        city: this._translateService.instant('msg.storage.ui.timezone.city.knox-in'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Managua',
        city: this._translateService.instant('msg.storage.ui.timezone.city.managua'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.nicaragua'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Matamoros',
        city: this._translateService.instant('msg.storage.ui.timezone.city.matamoros'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Menominee',
        city: this._translateService.instant('msg.storage.ui.timezone.city.menominee'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Merida',
        city: this._translateService.instant('msg.storage.ui.timezone.city.merida'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Mexico_City',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mexico-city'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Monterrey',
        city: this._translateService.instant('msg.storage.ui.timezone.city.monterrey'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/North_Dakota/Beulah',
        city: this._translateService.instant('msg.storage.ui.timezone.city.beulah'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/North_Dakota/Center',
        city: this._translateService.instant('msg.storage.ui.timezone.city.center'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/North_Dakota/New_Salem',
        city: this._translateService.instant('msg.storage.ui.timezone.city.new-salem'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Rainy_River',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rainy-river'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Rankin_Inlet',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rankin-inlet'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Regina',
        city: this._translateService.instant('msg.storage.ui.timezone.city.regina'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Resolute',
        city: this._translateService.instant('msg.storage.ui.timezone.city.resolute'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Swift_Current',
        city: this._translateService.instant('msg.storage.ui.timezone.city.swift-current'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Tegucigalpa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tegucigalpa'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.honduras'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'America/Winnipeg',
        city: this._translateService.instant('msg.storage.ui.timezone.city.winnipeg'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'Canada/Central',
        city: this._translateService.instant('msg.storage.ui.timezone.city.central'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-06:00',
        momentName: 'Canada/Saskatchewan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.saskatchewan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-06:00',
        momentName: 'Chile/EasterIsland',
        city: this._translateService.instant('msg.storage.ui.timezone.city.easter-island'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.chile')
      },
      {
        utc: '-06:00',
        momentName: 'Mexico/General',
        city: this._translateService.instant('msg.storage.ui.timezone.city.general'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.mexico')
      },
      {
        utc: '-06:00',
        momentName: 'Pacific/Easter',
        city: this._translateService.instant('msg.storage.ui.timezone.city.easter'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.chile'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '-06:00',
        momentName: 'Pacific/Galapagos',
        city: this._translateService.instant('msg.storage.ui.timezone.city.galapagos'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ecuador'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-06:00',
        momentName: 'US/Central',
        city: this._translateService.instant('msg.storage.ui.timezone.city.central'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-06:00',
        momentName: 'US/Indiana-Starke',
        city: this._translateService.instant('msg.storage.ui.timezone.city.indiana-starke'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-06:00',
        momentName: 'CST6CDT',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.CST6CDT')
      },
      {
        utc: '-05:00',
        momentName: 'America/Atikokan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.atikokan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Bogota',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bogota'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.colombia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Cancun',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cancun'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mexico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Cayman',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cayman'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cayman'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Coral_Harbour',
        city: this._translateService.instant('msg.storage.ui.timezone.city.coral-harbour'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Detroit',
        city: this._translateService.instant('msg.storage.ui.timezone.city.detroit'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Eirunepe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.eirunepe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Fort_Wayne',
        city: this._translateService.instant('msg.storage.ui.timezone.city.fort-wayne'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Guayaquil',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guayaquil'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ecuador'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Havana',
        city: this._translateService.instant('msg.storage.ui.timezone.city.havana'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cuba'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Indiana/Indianapolis&America/Indianapolis',
        city: this._translateService.instant('msg.storage.ui.timezone.city.indianapolis'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Indiana/Marengo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.marengo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Indiana/Petersburg',
        city: this._translateService.instant('msg.storage.ui.timezone.city.petersburg'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Indiana/Vevay',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vevay'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Indiana/Vincennes',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vincennes'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Indiana/Winamac',
        city: this._translateService.instant('msg.storage.ui.timezone.city.winamac'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Iqaluit',
        city: this._translateService.instant('msg.storage.ui.timezone.city.iqaluit'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Jamaica',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jamaica'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.jamaica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Kentucky/Louisville&America/Louisville',
        city: this._translateService.instant('msg.storage.ui.timezone.city.louisville'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Kentucky/Monticello',
        city: this._translateService.instant('msg.storage.ui.timezone.city.monticello'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Kentucky/Lima',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lima'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.peru'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Montreal',
        city: this._translateService.instant('msg.storage.ui.timezone.city.montreal'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Nassau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nassau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bahamas'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/New_York',
        city: this._translateService.instant('msg.storage.ui.timezone.city.new-york'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Nipigon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nipigon'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Panama',
        city: this._translateService.instant('msg.storage.ui.timezone.city.panama'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.panama'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Pangnirtung',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pangnirtung'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Port-au-Prince',
        city: this._translateService.instant('msg.storage.ui.timezone.city.port-au-Prince'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.haiti'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Porto_Acre',
        city: this._translateService.instant('msg.storage.ui.timezone.city.porto-acre'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Rio_Branco',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rio-branco'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Thunder_Bay',
        city: this._translateService.instant('msg.storage.ui.timezone.city.thunder-bay'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'America/Toronto',
        city: this._translateService.instant('msg.storage.ui.timezone.city.toronto'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-05:00',
        momentName: 'Brazil/Acre',
        city: this._translateService.instant('msg.storage.ui.timezone.city.acre'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.brazil')
      },
      {
        utc: '-05:00',
        momentName: 'Canada/Eastern',
        city: this._translateService.instant('msg.storage.ui.timezone.city.eastern'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-05:00',
        momentName: 'US/Eastern',
        city: this._translateService.instant('msg.storage.ui.timezone.city.eastern'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-05:00',
        momentName: 'US/East-Indiana',
        city: this._translateService.instant('msg.storage.ui.timezone.city.east-indiana'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-05:00',
        momentName: 'US/Michigan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.michigan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.us')
      },
      {
        utc: '-05:00',
        momentName: 'Cuba',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.cuba')
      },
      {
        utc: '-05:00',
        momentName: 'EST',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.EST')
      },
      {
        utc: '-05:00',
        momentName: 'EST5EDT',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.EST5EDT')
      },
      {
        utc: '-05:00',
        momentName: 'Jamaica',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.jamaica')
      },
      {
        utc: '-04:00',
        momentName: 'America/Anguilla',
        city: this._translateService.instant('msg.storage.ui.timezone.city.anguilla'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.anguilla'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Antigua',
        city: this._translateService.instant('msg.storage.ui.timezone.city.antigua'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antigua-barbuda'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Aruba',
        city: this._translateService.instant('msg.storage.ui.timezone.city.aruba'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.aruba'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Asuncion',
        city: this._translateService.instant('msg.storage.ui.timezone.city.asuncion'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.paraguay'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Barbados',
        city: this._translateService.instant('msg.storage.ui.timezone.city.barbados'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.barbados'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Blanc-Sablon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.blanc-sablon'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Boa_Vista',
        city: this._translateService.instant('msg.storage.ui.timezone.city.boa-vista'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Campo_Grande',
        city: this._translateService.instant('msg.storage.ui.timezone.city.campo-grande'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Caracas',
        city: this._translateService.instant('msg.storage.ui.timezone.city.caracas'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.venezuela'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Cuiaba',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cuiaba'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Curacao',
        city: this._translateService.instant('msg.storage.ui.timezone.city.curacao'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.curacao'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Dominica',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dominica'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.dominica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Glace_Bay',
        city: this._translateService.instant('msg.storage.ui.timezone.city.glace-bay'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Goose_Bay',
        city: this._translateService.instant('msg.storage.ui.timezone.city.goose-bay'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Grand_Turk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.grand-turk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.turks'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Grenada',
        city: this._translateService.instant('msg.storage.ui.timezone.city.grenada'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.grenada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Guadeloupe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guadeloupe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guadeloupe'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Guyana',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guyana'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guyana'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Halifax',
        city: this._translateService.instant('msg.storage.ui.timezone.city.halifax'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Kralendijk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kralendijk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bonaire'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/La_Paz',
        city: this._translateService.instant('msg.storage.ui.timezone.city.la-paz'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bonaire'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Lower_Princes',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lower-princes'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.sint-maarten'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Manaus',
        city: this._translateService.instant('msg.storage.ui.timezone.city.manaus'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Marigot',
        city: this._translateService.instant('msg.storage.ui.timezone.city.marigot'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-martin'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Martinique',
        city: this._translateService.instant('msg.storage.ui.timezone.city.martinique'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.martinique'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Moncton',
        city: this._translateService.instant('msg.storage.ui.timezone.city.moncton'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Montserrat',
        city: this._translateService.instant('msg.storage.ui.timezone.city.montserrat'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.montserrat'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Port_of_Spain',
        city: this._translateService.instant('msg.storage.ui.timezone.city.port-spain'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tobago'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Porto_Velho',
        city: this._translateService.instant('msg.storage.ui.timezone.city.porto-velho'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Puerto_Rico',
        city: this._translateService.instant('msg.storage.ui.timezone.city.puerto-rico'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.puerto-rico'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Santiago',
        city: this._translateService.instant('msg.storage.ui.timezone.city.santiago'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.chile'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Santo_Domingo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.santo-domingo'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/St_Barthelemy',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-barthelemy'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-barthelemy'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/St_Kitts',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-kitts'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-kitts'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/St_Lucia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-lucia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-lucia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/St_Thomas',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-thomas'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.virgin-us'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/St_Vincent',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-vincent'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-vincent-grenadines'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Thule',
        city: this._translateService.instant('msg.storage.ui.timezone.city.thule'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.greenland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Tortola',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tortola'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.virgin-british'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'America/Virgin',
        city: this._translateService.instant('msg.storage.ui.timezone.city.virgin'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-04:00',
        momentName: 'Atlantic/Bermuda',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bermuda'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bermuda'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '-04:00',
        momentName: 'Brazil/West',
        city: this._translateService.instant('msg.storage.ui.timezone.city.west'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.brazil')
      },
      {
        utc: '-04:00',
        momentName: 'Canada/Atlantic',
        city: this._translateService.instant('msg.storage.ui.timezone.city.atlantic'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-04:00',
        momentName: 'Chile/Continental',
        city: this._translateService.instant('msg.storage.ui.timezone.city.continental'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.chile')
      },
      {
        utc: '-03:30',
        momentName: 'America/St_Johns',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-johns'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.canada'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:30',
        momentName: 'Canada/Newfoundland',
        city: this._translateService.instant('msg.storage.ui.timezone.city.newfoundland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.canada')
      },
      {
        utc: '-03:00',
        momentName: 'America/Araguaina',
        city: this._translateService.instant('msg.storage.ui.timezone.city.araguaina'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Buenos_Aires&America/Buenos_Aires',
        city: this._translateService.instant('msg.storage.ui.timezone.city.buenos-aires'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Catamarca&America/Catamarca',
        city: this._translateService.instant('msg.storage.ui.timezone.city.catamarca'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/ComodRivadavia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.comodRivadavia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Cordoba&America/Cordoba',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cordoba'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Jujuy&America/Jujuy',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jujuy'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/La_Rioja',
        city: this._translateService.instant('msg.storage.ui.timezone.city.la-rioja'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Mendoza&America/Mendoza',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mendoza'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Rio_Gallegos',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rio-gallegos'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Salta',
        city: this._translateService.instant('msg.storage.ui.timezone.city.salta'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/San_Juan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.san-juan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/San_Luis',
        city: this._translateService.instant('msg.storage.ui.timezone.city.san-luis'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Tucuman',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tucuman'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Argentina/Ushuaia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ushuaia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Bahia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bahia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Belem',
        city: this._translateService.instant('msg.storage.ui.timezone.city.belem'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Cayenne',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cayenne'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.french-guiana'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Fortaleza',
        city: this._translateService.instant('msg.storage.ui.timezone.city.fortaleza'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Godthab',
        city: this._translateService.instant('msg.storage.ui.timezone.city.godthab'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.greenland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Maceio',
        city: this._translateService.instant('msg.storage.ui.timezone.city.maceio'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Miquelon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.miquelon'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-pierre-miquelon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Montevideo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.montevideo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.uruguay'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Paramaribo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.paramaribo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.suriname'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Punta_Arenas',
        city: this._translateService.instant('msg.storage.ui.timezone.city.punta-arenas'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.chile'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Recife',
        city: this._translateService.instant('msg.storage.ui.timezone.city.recife'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Rosario',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rosario'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.argentina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Santarem',
        city: this._translateService.instant('msg.storage.ui.timezone.city.santarem'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'America/Sao_Paulo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sao-paulo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-03:00',
        momentName: 'Antarctica/Palmer',
        city: this._translateService.instant('msg.storage.ui.timezone.city.palmer'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '-03:00',
        momentName: 'Antarctica/Rothera',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rothera'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '-03:00',
        momentName: 'Atlantic/Stanley',
        city: this._translateService.instant('msg.storage.ui.timezone.city.stanley'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.falkland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '-03:00',
        momentName: 'Brazil/East',
        city: this._translateService.instant('msg.storage.ui.timezone.city.east'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.brazil')
      },
      {
        utc: '-02:00',
        momentName: 'America/Noronha',
        city: this._translateService.instant('msg.storage.ui.timezone.city.noronha'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brazil'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '-02:00',
        momentName: 'Atlantic/South_Georgia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.south-georgia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.south-georgia-south-sandwich'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '-02:00',
        momentName: 'Brazil/DeNoronha',
        city: this._translateService.instant('msg.storage.ui.timezone.city.denoronha'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.brazil')
      },
      {
        utc: '-01:00',
        momentName: 'Atlantic/Cape_Verde',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cape-verde'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cape-verde'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '-01:00',
        momentName: 'Atlantic/Azores',
        city: this._translateService.instant('msg.storage.ui.timezone.city.azores'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.portugal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '-01:00',
        momentName: 'America/Scoresbysund',
        city: this._translateService.instant('msg.storage.ui.timezone.city.scoresbysund'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.greenland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Abidjan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.abidjan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cote-d-ivoire'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Accra',
        city: this._translateService.instant('msg.storage.ui.timezone.city.accra'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ghana'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Bamako',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bamako'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mali'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Banjul',
        city: this._translateService.instant('msg.storage.ui.timezone.city.banjul'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.gambia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Bissau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bissau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guinea-bissau'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Conakry',
        city: this._translateService.instant('msg.storage.ui.timezone.city.conakry'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guinea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Dakar',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dakar'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.senegal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/El_Aaiun',
        city: this._translateService.instant('msg.storage.ui.timezone.city.el-aaiun'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.western-sahara'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Freetown',
        city: this._translateService.instant('msg.storage.ui.timezone.city.freetown'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.sierra-leone'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Lome',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lome'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.togo'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Monrovia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.monrovia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.liberia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Nouakchott',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nouakchott'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mauritania'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Ouagadougou',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ouagadougou'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.burkina-faso'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Timbuktu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.timbuktu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mali'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+00:00',
        momentName: 'Africa/Danmarkshavn',
        city: this._translateService.instant('msg.storage.ui.timezone.city.danmarkshavn'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.greenland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.america')
      },
      {
        utc: '+00:00',
        momentName: 'Antarctica/Troll',
        city: this._translateService.instant('msg.storage.ui.timezone.city.troll'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+00:00',
        momentName: 'Atlantic/Canary',
        city: this._translateService.instant('msg.storage.ui.timezone.city.canary'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.spain'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '+00:00',
        momentName: 'Atlantic/Faeroe&Atlantic/Faroe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.faroe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.faroe'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '+00:00',
        momentName: 'Atlantic/Madeira',
        city: this._translateService.instant('msg.storage.ui.timezone.city.madeira'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.portugal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '+00:00',
        momentName: 'Atlantic/Reykjavik',
        city: this._translateService.instant('msg.storage.ui.timezone.city.reykjavik'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.iceland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '+00:00',
        momentName: 'Atlantic/St_Helena',
        city: this._translateService.instant('msg.storage.ui.timezone.city.st-helena'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saint-lelena'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '+00:00',
        momentName: 'Etc/Greenwich',
        city: this._translateService.instant('msg.storage.ui.timezone.city.greenwich'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.etc')
      },
      {
        utc: '+00:00',
        momentName: 'Etc/UCT',
        city: this._translateService.instant('msg.storage.ui.timezone.continent.UCT'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.etc')
      },
      {
        utc: '+00:00',
        momentName: 'Etc/UTC',
        city: this._translateService.instant('msg.storage.ui.timezone.continent.UTC'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.etc')
      },
      {
        utc: '+00:00',
        momentName: 'Etc/Universal',
        city: this._translateService.instant('msg.storage.ui.timezone.city.universal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.etc')
      },
      {
        utc: '+00:00',
        momentName: 'Etc/Zulu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.zulu'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.etc')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/Belfast',
        city: this._translateService.instant('msg.storage.ui.timezone.city.belfast'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/Dublin',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dublin'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ireland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/Guernsey',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guernsey'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guernsey'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/Isle_of_Man',
        city: this._translateService.instant('msg.storage.ui.timezone.city.man'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.man'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/Jersey',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jersey'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.jersey'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/Lisbon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lisbon'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.portugal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Europe/London',
        city: this._translateService.instant('msg.storage.ui.timezone.city.london'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-kingdom'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+00:00',
        momentName: 'Eire',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.eire')
      },
      {
        utc: '+00:00',
        momentName: 'GB',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.GB')
      },
      {
        utc: '+00:00',
        momentName: 'Greenwich',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.greenwich')
      },
      {
        utc: '+00:00',
        momentName: 'Iceland',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.iceland')
      },
      {
        utc: '+00:00',
        momentName: 'Portugal',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.portugal')
      },
      {
        utc: '+00:00',
        momentName: 'Universal',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.universal')
      },
      {
        utc: '+00:00',
        momentName: 'UTC',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.UTC')
      },
      {
        utc: '+00:00',
        momentName: 'WET',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.WET')
      },
      {
        utc: '+00:00',
        momentName: 'Zulu',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.zulu')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Algiers',
        city: this._translateService.instant('msg.storage.ui.timezone.city.algiers'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.algeria'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Bangui',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bangui'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.central-african'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Brazzav',
        city: this._translateService.instant('msg.storage.ui.timezone.city.brazzaville'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.congo'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Casablanca',
        city: this._translateService.instant('msg.storage.ui.timezone.city.casablanca'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.morocco'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Ceuta',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ceuta'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.spain'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Douala',
        city: this._translateService.instant('msg.storage.ui.timezone.city.douala'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cameroon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Kinshasa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kinshasa'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.democratic-congo'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Lagos',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lagos'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.nigeria'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Libreville',
        city: this._translateService.instant('msg.storage.ui.timezone.city.libreville'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.gabon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Luanda',
        city: this._translateService.instant('msg.storage.ui.timezone.city.luanda'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.angola'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Malabo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.malabo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.equatorial-guinea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Ndjamena',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ndjamena'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.chad'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Niamey',
        city: this._translateService.instant('msg.storage.ui.timezone.city.niamey'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.niger'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Porto-Novo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.porto-novo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.benin'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Sao_Tome',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sao-tome'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.sao-tome-principe'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Africa/Tunis',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tunis'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tunisia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Arctic/Longyearbyen',
        city: this._translateService.instant('msg.storage.ui.timezone.city.longyearbyen'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.svalbard-jan-mayen'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+01:00',
        momentName: 'Atlantic/Jan_Mayen',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jan-mayen'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.atlantic')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Amsterdam',
        city: this._translateService.instant('msg.storage.ui.timezone.city.amsterdam'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.netherlands'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Andorra',
        city: this._translateService.instant('msg.storage.ui.timezone.city.andorra'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.andorra'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Belgrade',
        city: this._translateService.instant('msg.storage.ui.timezone.city.belgrade'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.serbia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Berlin',
        city: this._translateService.instant('msg.storage.ui.timezone.city.berlin'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.germany'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Bratislava',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bratislava'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.slovakia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Brussels',
        city: this._translateService.instant('msg.storage.ui.timezone.city.brussels'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.belgium'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Budapest',
        city: this._translateService.instant('msg.storage.ui.timezone.city.budapest'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.hungary'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Busingen',
        city: this._translateService.instant('msg.storage.ui.timezone.city.busingen'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.germany'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Copenhagen',
        city: this._translateService.instant('msg.storage.ui.timezone.city.copenhagen'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.denmark'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Gibraltar',
        city: this._translateService.instant('msg.storage.ui.timezone.city.gibraltar'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.gibraltar'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Ljubljana',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ljubljana'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.slovenia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Luxembourg',
        city: this._translateService.instant('msg.storage.ui.timezone.city.luxembourg'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.luxembourg'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Madrid',
        city: this._translateService.instant('msg.storage.ui.timezone.city.madrid'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.spain'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Malta',
        city: this._translateService.instant('msg.storage.ui.timezone.city.malta'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.malta'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Monaco',
        city: this._translateService.instant('msg.storage.ui.timezone.city.monaco'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.monaco'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Oslo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.oslo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.norway'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Paris',
        city: this._translateService.instant('msg.storage.ui.timezone.city.paris'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.france'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Podgorica',
        city: this._translateService.instant('msg.storage.ui.timezone.city.podgorica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Prague',
        city: this._translateService.instant('msg.storage.ui.timezone.city.prague'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.czech'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Rome',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rome'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.italy'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/San_Marino',
        city: this._translateService.instant('msg.storage.ui.timezone.city.san-marino'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.san-marino'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Sarajevo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sarajevo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bosnia-hercegovina'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Skopje',
        city: this._translateService.instant('msg.storage.ui.timezone.city.skopje'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.macedonia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Stockholm',
        city: this._translateService.instant('msg.storage.ui.timezone.city.stockholm'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.sweden'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Tirane',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tirane'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.albania'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Vaduz',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vaduz'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.liechtenstein'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Vatican',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vatican'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.vatican'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Vienna',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vienna'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.austria'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Warsaw',
        city: this._translateService.instant('msg.storage.ui.timezone.city.warsaw'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.poland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Zagreb',
        city: this._translateService.instant('msg.storage.ui.timezone.city.zagreb'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.croatia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'Europe/Zurich',
        city: this._translateService.instant('msg.storage.ui.timezone.city.zurich'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.switzerland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+01:00',
        momentName: 'CET',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.CET')
      },
      {
        utc: '+01:00',
        momentName: 'MET',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.MET')
      },
      {
        utc: '+01:00',
        momentName: 'Poland',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.poland')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Blantyre',
        city: this._translateService.instant('msg.storage.ui.timezone.city.blantyre'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.malawi'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Bujumbura',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bujumbura'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.burundi'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Cairo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cairo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.egypt'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Gaborone',
        city: this._translateService.instant('msg.storage.ui.timezone.city.gaborone'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.botswana'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Harare',
        city: this._translateService.instant('msg.storage.ui.timezone.city.harare'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.zimbabwe'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Johannesburg',
        city: this._translateService.instant('msg.storage.ui.timezone.city.johannesburg'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.south-africa'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Khartoum',
        city: this._translateService.instant('msg.storage.ui.timezone.city.khartoum'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.sudan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Kigali',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kigali'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.rwanda'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Lubumbashi',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lubumbashi'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.democratic-congo'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Lusaka',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lusaka'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.zambia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Maputo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.maputo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mozambique'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Maseru',
        city: this._translateService.instant('msg.storage.ui.timezone.city.maseru'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.lesotho'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Mbabane',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mbabane'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.swaziland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Tripoli',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tripoli'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.libyan-arab-jamahiriya'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Africa/Windhoek',
        city: this._translateService.instant('msg.storage.ui.timezone.city.windhoek'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.namibia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Amman',
        city: this._translateService.instant('msg.storage.ui.timezone.city.amman'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.jordan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Beirut',
        city: this._translateService.instant('msg.storage.ui.timezone.city.beirut'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.lebanon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Damascus',
        city: this._translateService.instant('msg.storage.ui.timezone.city.damascus'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.syrian-arab'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Famagusta',
        city: this._translateService.instant('msg.storage.ui.timezone.city.famagusta'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cyprus'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Gaza',
        city: this._translateService.instant('msg.storage.ui.timezone.city.gaza'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.palestine'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Hebron',
        city: this._translateService.instant('msg.storage.ui.timezone.city.hebron'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.palestine'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Jerusalem',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jerusalem'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.israel'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Tel_Aviv',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tel-aviv'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Athens',
        city: this._translateService.instant('msg.storage.ui.timezone.city.athens'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.greece'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Bucharest',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bucharest'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.romania'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Chisinau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chisinau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.moldova'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Helsinki',
        city: this._translateService.instant('msg.storage.ui.timezone.city.helsinki'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.finland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Kaliningrad',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kaliningrad'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Kiev',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kiev'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ukraine'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Mariehamn',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mariehamn'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.aland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Asia/Nicosia&Europe/Nicosia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nicosia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cyprus'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Riga',
        city: this._translateService.instant('msg.storage.ui.timezone.city.riga'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.latvia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Sofia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sofia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bulgaria'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Tallinn',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tallinn'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.estonia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Tiraspol',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tiraspol'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Uzhgorod',
        city: this._translateService.instant('msg.storage.ui.timezone.city.uzhgorod'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ukraine'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Vilnius',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vilnius'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.lithuania'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'Europe/Zaporozhye',
        city: this._translateService.instant('msg.storage.ui.timezone.city.zaporozhye'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ukraine'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+02:00',
        momentName: 'EET',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.EET')
      },
      {
        utc: '+02:00',
        momentName: 'Egypt',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.egypt')
      },
      {
        utc: '+02:00',
        momentName: 'Israel',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.israel')
      },
      {
        utc: '+02:00',
        momentName: 'Libya',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.libya')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Addis_Ababa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.addis-ababa'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ethiopia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Asmara',
        city: this._translateService.instant('msg.storage.ui.timezone.city.asmara'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.eritrea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Asmera',
        city: this._translateService.instant('msg.storage.ui.timezone.city.asmara'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.eritrea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Dar_es_Salaam',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dar-es-salaam'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tanzania'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Djibouti',
        city: this._translateService.instant('msg.storage.ui.timezone.city.djibouti'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.djibouti'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Juba',
        city: this._translateService.instant('msg.storage.ui.timezone.city.juba'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.south-sudan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Kampala',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kampala'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.uganda'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Mogadishu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mogadishu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.somalia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Africa/Nairobi',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nairobi'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kenya'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.africa')
      },
      {
        utc: '+03:00',
        momentName: 'Antarctica/Syowa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.syowa'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Aden',
        city: this._translateService.instant('msg.storage.ui.timezone.city.aden'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.yemen'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Baghdad',
        city: this._translateService.instant('msg.storage.ui.timezone.city.baghdad'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.iraq'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Bahrain',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bahrain'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bahrain'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Istanbul',
        city: this._translateService.instant('msg.storage.ui.timezone.city.istanbul'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.turkey'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Europe/Istanbul',
        city: this._translateService.instant('msg.storage.ui.timezone.city.istanbul'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.turkey'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Kuwait',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kuwait'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kuwait'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Qatar',
        city: this._translateService.instant('msg.storage.ui.timezone.city.qatar'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.qatar'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Riyadh',
        city: this._translateService.instant('msg.storage.ui.timezone.city.riyadh'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.saudi-arabia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Kirov',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kirov'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Minsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.minsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.belarus'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+03:00',
        momentName: 'Asia/Moscow',
        city: this._translateService.instant('msg.storage.ui.timezone.city.moscow'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+03:00',
        momentName: 'Europe/Simferopol',
        city: this._translateService.instant('msg.storage.ui.timezone.city.simferopol'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.ukraine'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+03:00',
        momentName: 'Indian/Antananarivo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.antananarivo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.madagascar'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+03:00',
        momentName: 'Indian/Comoro',
        city: this._translateService.instant('msg.storage.ui.timezone.city.comoro'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.comoros'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+03:00',
        momentName: 'Indian/Mayotte',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mayotte'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mayotte'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+03:00',
        momentName: 'Turkey',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.turkey')
      },
      {
        utc: '+03:00',
        momentName: 'W-SU',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.W-SU')
      },
      {
        utc: '+03:30',
        momentName: 'Asia/Tehran',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tehran'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.iran'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+03:30',
        momentName: 'Iran',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.iran')
      },
      {
        utc: '+04:00',
        momentName: 'Asia/Baku',
        city: this._translateService.instant('msg.storage.ui.timezone.city.baku'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.azerbaijan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+04:00',
        momentName: 'Asia/Dubai',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dubai'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.arab-emirates'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+04:00',
        momentName: 'Asia/Muscat',
        city: this._translateService.instant('msg.storage.ui.timezone.city.muscat'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.oman'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+04:00',
        momentName: 'Asia/Tbilisi',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tbilisi'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.georgia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+04:00',
        momentName: 'Asia/yerevan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yerevan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.armenia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+04:00',
        momentName: 'Europe/Astrakhan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.astrakhan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+04:00',
        momentName: 'Europe/Samara',
        city: this._translateService.instant('msg.storage.ui.timezone.city.samara'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+04:00',
        momentName: 'Europe/Saratov',
        city: this._translateService.instant('msg.storage.ui.timezone.city.saratov'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+04:00',
        momentName: 'Europe/Ulyanovsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ulyanovsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+04:00',
        momentName: 'Europe/Volgograd',
        city: this._translateService.instant('msg.storage.ui.timezone.city.volgograd'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.europe')
      },
      {
        utc: '+04:00',
        momentName: 'Indian/Mahe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mahe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.seychelles'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+04:00',
        momentName: 'Indian/Mauritius',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mauritius'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mauritius'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+04:00',
        momentName: 'Indian/Reunion',
        city: this._translateService.instant('msg.storage.ui.timezone.city.reunion'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.reunion'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+04:30',
        momentName: 'Asia/Kabul',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kabul'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.afghanistan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Antarctica/Mawson',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mawson'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Aqtau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.aqtau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kazakhstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Aqtobe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.aqtobe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kazakhstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Ashgabat',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ashgabat'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.turkmenistan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Ashkhabad',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ashkhabad'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Atyrau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.atyrau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kazakhstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Dushanbe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dushanbe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tajikistan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Karachi',
        city: this._translateService.instant('msg.storage.ui.timezone.city.karachi'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.pakistan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Oral',
        city: this._translateService.instant('msg.storage.ui.timezone.city.oral'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kazakhstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Qyzylorda',
        city: this._translateService.instant('msg.storage.ui.timezone.city.qyzylorda'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kazakhstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Samarkand',
        city: this._translateService.instant('msg.storage.ui.timezone.city.samarkand'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.uzbekistan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Tashkent',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tashkent'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.uzbekistan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Asia/Yekaterinburg',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yekaterinburg'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:00',
        momentName: 'Indian/Kerguelen',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kerguelen'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.french-southern-territories'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+05:00',
        momentName: 'Indian/Maldives',
        city: this._translateService.instant('msg.storage.ui.timezone.city.maldives'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.maldives'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+05:30',
        momentName: 'Asia/Calcutta',
        city: this._translateService.instant('msg.storage.ui.timezone.city.calcutta'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:30',
        momentName: 'Asia/Colombo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.colombo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.sri-lanka'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:30',
        momentName: 'Asia/Kolkata',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kolkata'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.india'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:45',
        momentName: 'Asia/Kathmandu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kathmandu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.nepal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+05:45',
        momentName: 'Asia/Katmandu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kathmandu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.nepal'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Antarctica/Vostok',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vostok'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Almaty',
        city: this._translateService.instant('msg.storage.ui.timezone.city.almaty'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kazakhstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Bishkek',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bishkek'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kyrgyzstan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Dacca',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dacca'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Dhaka',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dhaka'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bangladesh'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Kashgar',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kashgar'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Omsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.omsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Thimbu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.thimphu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bhutan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Thimphu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.thimphu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.bhutan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Asia/Urumqi',
        city: this._translateService.instant('msg.storage.ui.timezone.city.urumqi'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.china'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:00',
        momentName: 'Indian/Chagos',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chagos'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.british-indian-ocean-territory'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+06:30',
        momentName: 'Asia/Rangoon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.rangoon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:30',
        momentName: 'Asia/Yangon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yangon'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.myanmar'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+06:30',
        momentName: 'Indian/Cocos',
        city: this._translateService.instant('msg.storage.ui.timezone.city.cocos'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cocos'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+07:00',
        momentName: 'Antarctica/Davis',
        city: this._translateService.instant('msg.storage.ui.timezone.city.davis'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Bangkok',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bangkok'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.thailand'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Barnaul',
        city: this._translateService.instant('msg.storage.ui.timezone.city.barnaul'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Ho_Chi_Minh',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ho-chi-minh'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.viet-nam'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Hovd',
        city: this._translateService.instant('msg.storage.ui.timezone.city.hovd'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mongolia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Jakarta',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jakarta'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.indonesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Krasnoyarsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.krasnoyarsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Novokuznetsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.novokuznetsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Novosibirsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.novosibirsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Phnom_Penh',
        city: this._translateService.instant('msg.storage.ui.timezone.city.phnom-penh'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.cambodia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Pontianak',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pontianak'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.indonesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Saigon',
        city: this._translateService.instant('msg.storage.ui.timezone.city.saigon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Tomsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tomsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Asia/Vientiane',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vientiane'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.laos'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+07:00',
        momentName: 'Indian/Christmas',
        city: this._translateService.instant('msg.storage.ui.timezone.city.christmas'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.christmas'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.indian')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Brunei',
        city: this._translateService.instant('msg.storage.ui.timezone.city.brunei'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.brunei-darussalam'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Choibalsan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.choibalsan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mongolia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Chongqing',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chongqing'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Chungking',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chongqing'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Harbin',
        city: this._translateService.instant('msg.storage.ui.timezone.city.harbin'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Hong_Kong',
        city: this._translateService.instant('msg.storage.ui.timezone.city.hong-kong'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.hong-kong'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Irkutsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.irkutsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Kuala_Lumpur',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kuala-lumpur'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.malaysia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Kuching',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kuching'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.malaysia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Macao',
        city: this._translateService.instant('msg.storage.ui.timezone.city.macao'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Macau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.macao'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Makassar',
        city: this._translateService.instant('msg.storage.ui.timezone.city.makassar'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.indonesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Manila',
        city: this._translateService.instant('msg.storage.ui.timezone.city.manila'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.philippines'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Shanghai',
        city: this._translateService.instant('msg.storage.ui.timezone.city.shanghai'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.china'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Singapore',
        city: this._translateService.instant('msg.storage.ui.timezone.city.singapore'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.singapore'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Taipei',
        city: this._translateService.instant('msg.storage.ui.timezone.city.taipei'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.taiwan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Ujung_Pandang',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ujung-pandang'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Ulaanbaatar',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ulaanbaatar'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mongolia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Asia/Ulan_Bator',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ulaanbaatar'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.mongolia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+08:00',
        momentName: 'Australia/Perth',
        city: this._translateService.instant('msg.storage.ui.timezone.city.perth'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+08:00',
        momentName: 'Australia/West',
        city: this._translateService.instant('msg.storage.ui.timezone.city.west'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+08:00',
        momentName: 'Hongkong',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.hongkong')
      },
      {
        utc: '+08:00',
        momentName: 'PRC',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.PRC')
      },
      {
        utc: '+08:00',
        momentName: 'ROC',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.ROC')
      },
      {
        utc: '+08:00',
        momentName: 'Singapore',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.singapore')
      },
      {
        utc: '+08:45',
        momentName: 'Australia/Eucla',
        city: this._translateService.instant('msg.storage.ui.timezone.city.eucla'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Chita',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chita'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Dili',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dili'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.east-timor'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Jayapura',
        city: this._translateService.instant('msg.storage.ui.timezone.city.jayapura'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.indonesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Khandyga',
        city: this._translateService.instant('msg.storage.ui.timezone.city.khandyga'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Pyongyang',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pyongyang'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.north-korea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Seoul',
        city: this._translateService.instant('msg.storage.ui.timezone.city.seoul'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.korea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Tokyo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tokyo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.japan'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Asia/Yakutsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yakutsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+09:00',
        momentName: 'Pacific/Palau',
        city: this._translateService.instant('msg.storage.ui.timezone.city.palau'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.palau'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+09:00',
        momentName: 'Japan',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.japan')
      },
      {
        utc: '+09:00',
        momentName: 'ROK',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.ROK')
      },
      {
        utc: '+09:30',
        momentName: 'Australia/Adelaide',
        city: this._translateService.instant('msg.storage.ui.timezone.city.adelaide'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+09:30',
        momentName: 'Australia/Broken_Hill',
        city: this._translateService.instant('msg.storage.ui.timezone.city.broken-hill'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+09:30',
        momentName: 'Australia/Darwin',
        city: this._translateService.instant('msg.storage.ui.timezone.city.darwin'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+09:30',
        momentName: 'Australia/North',
        city: this._translateService.instant('msg.storage.ui.timezone.city.north'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+09:30',
        momentName: 'Australia/South',
        city: this._translateService.instant('msg.storage.ui.timezone.city.south'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+09:30',
        momentName: 'Australia/Yancowinna',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yancowinna'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Antarctica/DumontDUrville',
        city: this._translateService.instant('msg.storage.ui.timezone.city.dumontdurville'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+10:00',
        momentName: 'Asia/Ust-Nera',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ust-nera'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+10:00',
        momentName: 'Asia/Vladivostok',
        city: this._translateService.instant('msg.storage.ui.timezone.city.vladivostok'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/ACT',
        city: this._translateService.instant('msg.storage.ui.timezone.city.act'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Brisbane',
        city: this._translateService.instant('msg.storage.ui.timezone.city.brisbane'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Canberra',
        city: this._translateService.instant('msg.storage.ui.timezone.city.canberra'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Currie',
        city: this._translateService.instant('msg.storage.ui.timezone.city.currie'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Hobart',
        city: this._translateService.instant('msg.storage.ui.timezone.city.hobart'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Lindeman',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lindeman'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Melbourne',
        city: this._translateService.instant('msg.storage.ui.timezone.city.melbourne'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/NSW',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nsw'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Queensland',
        city: this._translateService.instant('msg.storage.ui.timezone.city.queensland'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Sydney',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sydney'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Tasmania',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tasmania'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Australia/Victoria',
        city: this._translateService.instant('msg.storage.ui.timezone.city.victoria'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:00',
        momentName: 'Pacific/Chuuk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chuuk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.micronesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+10:00',
        momentName: 'Pacific/Guam',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guam'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.guam'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+10:00',
        momentName: 'Pacific/Port_Moresby',
        city: this._translateService.instant('msg.storage.ui.timezone.city.port-moresby'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.papua-new-guinea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+10:00',
        momentName: 'Pacific/Saipan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.saipan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.northern-mariana'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+10:00',
        momentName: 'Pacific/Truk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.truk'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+10:00',
        momentName: 'Pacific/Yap',
        city: this._translateService.instant('msg.storage.ui.timezone.city.yap'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+10:30',
        momentName: 'Australia/LHI',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lhi'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+10:30',
        momentName: 'Australia/Lord_Howe',
        city: this._translateService.instant('msg.storage.ui.timezone.city.lord-howe'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.australia')
      },
      {
        utc: '+11:00',
        momentName: 'Antarctica/Casey',
        city: this._translateService.instant('msg.storage.ui.timezone.city.casey'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+11:00',
        momentName: 'Antarctica/Macquarie',
        city: this._translateService.instant('msg.storage.ui.timezone.city.macquarie'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.australia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+11:00',
        momentName: 'Asia/Magadan',
        city: this._translateService.instant('msg.storage.ui.timezone.city.magadan'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+11:00',
        momentName: 'Asia/Sakhalin',
        city: this._translateService.instant('msg.storage.ui.timezone.city.sakhalin'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+11:00',
        momentName: 'Asia/Srednekolymsk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.srednekolymsk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Bougainville',
        city: this._translateService.instant('msg.storage.ui.timezone.city.bougainville'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.papua-new-guinea'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Efate',
        city: this._translateService.instant('msg.storage.ui.timezone.city.efate'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.vanuatu'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Guadalcanal',
        city: this._translateService.instant('msg.storage.ui.timezone.city.guadalcanal'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.solomon'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Kosrae',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kosrae'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.micronesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Norfolk',
        city: this._translateService.instant('msg.storage.ui.timezone.city.norfolk'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.norfolk'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Noumea',
        city: this._translateService.instant('msg.storage.ui.timezone.city.noumea'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.new-caledonia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Pohnpei',
        city: this._translateService.instant('msg.storage.ui.timezone.city.pohnpei'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.micronesia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+11:00',
        momentName: 'Pacific/Ponape',
        city: this._translateService.instant('msg.storage.ui.timezone.city.ponape'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Antarctica/McMurdo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.mcmurdo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.antarctica'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+12:00',
        momentName: 'Antarctica/South_Pole',
        city: this._translateService.instant('msg.storage.ui.timezone.city.south-pole'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.antarctica')
      },
      {
        utc: '+12:00',
        momentName: 'Asia/Anadyr',
        city: this._translateService.instant('msg.storage.ui.timezone.city.anadyr'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+12:00',
        momentName: 'Asia/Kamchatka',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kamchatka'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.russia'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.asia')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Auckland',
        city: this._translateService.instant('msg.storage.ui.timezone.city.auckland'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.new-zealand'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Fiji',
        city: this._translateService.instant('msg.storage.ui.timezone.city.fiji'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.fiji'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Funafuti',
        city: this._translateService.instant('msg.storage.ui.timezone.city.funafuti'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tuvalu'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Kwajalein',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kwajalein'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.marshall'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Majuro',
        city: this._translateService.instant('msg.storage.ui.timezone.city.majuro'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.marshall'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Nauru',
        city: this._translateService.instant('msg.storage.ui.timezone.city.nauru'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.nauru'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Tarawa',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tarawa'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kiribati'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Wake',
        city: this._translateService.instant('msg.storage.ui.timezone.city.wake'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.united-states-minor'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Pacific/Wallis',
        city: this._translateService.instant('msg.storage.ui.timezone.city.wallis'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.wallis-futuna'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:00',
        momentName: 'Asia/Kwajalein',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.kwajalein')
      },
      {
        utc: '+12:00',
        momentName: 'NZ',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.NZ')
      },
      {
        utc: '+12:45',
        momentName: 'Pacific/Chatham',
        city: this._translateService.instant('msg.storage.ui.timezone.city.chatham'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.new-zealand'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+12:45',
        momentName: 'NZ-CHAT',
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.NZ-CHAT')
      },
      {
        utc: '+13:00',
        momentName: 'Pacific/Apia',
        city: this._translateService.instant('msg.storage.ui.timezone.city.apia'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.samoa'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+13:00',
        momentName: 'Pacific/Enderbury',
        city: this._translateService.instant('msg.storage.ui.timezone.city.enderbury'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kiribati'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+13:00',
        momentName: 'Pacific/Fakaofo',
        city: this._translateService.instant('msg.storage.ui.timezone.city.fakaofo'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tokelau'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+13:00',
        momentName: 'Pacific/Tongatapu',
        city: this._translateService.instant('msg.storage.ui.timezone.city.tongatapu'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.tonga'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
      {
        utc: '+14:00',
        momentName: 'Pacific/Kiritimati',
        city: this._translateService.instant('msg.storage.ui.timezone.city.kiritimati'),
        country: this._translateService.instant('msg.storage.ui.timezone.country.kiribati'),
        continent: this._translateService.instant('msg.storage.ui.timezone.continent.pacific')
      },
    ];
    // timezone make label property
    this._timeZoneLabelBuilder();
  }
}

export interface TimeZoneObject {
  utc: string;
  momentName: string;
  city?: string;
  country?: string;
  continent: string;
  label?: string;
}
