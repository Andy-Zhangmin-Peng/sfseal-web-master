import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
declare var BMap: any;
declare var BMapLib: any;
declare var BMAP_DRAWING_POLYGON;
declare var BMAP_ANCHOR_TOP_RIGHT;
declare var BMAP_DRAWING_CIRCLE;

@Component({
  selector: 'app-bmap',
  templateUrl: './bmap.component.html',
  styles: [
    
  ]
})
export class BmapComponent implements OnInit {

  // For Map
  opts:  any = {};
  markers: any[] = [];

  constructor() {
   }

  ngOnInit() {
    this.opts = {
      centerAndZoom: {     // 设置中心点和缩放级别
        lng: 123.31982864440313,   // 经度
        lat:  41.66944268486659,    // 纬度
        zoom: 15           // 缩放级别
      },
      enableHighResolution: true,  // 是否用高分辨率的地图，default：true
      enableAutoResize: true,  // 是否可以自动调整大小，default：true
      enableMapClick: true,  // 地图是否可以点击，default：true
      disableDragging: false, // 是否禁用地图拖动功能
      enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
      disableDoubleClickZoom: false, // 是否禁用双击缩放功能
    };


    // 这是地图标记marker
    this.markers = [
      {
        options: {
          icon: {
            imageUrl: './assets/../tag.png',
            size: {
              height: 60,
              width: 50
            }
          },
          title: 'asdkjgaslfkjasd'
        },
        point: {
          lng: 123.31,   // 经度
          lat: 41.66,    // 纬度
        }
      },
      {
        point: {
          lng: 123.31982864440313,   // 经度
          lat: 41.66944268486659,    // 纬度
        }
      },
      {
        point: {
          lng: 123.1676629672875,   // 经度
          lat: 41.68674075970364,    // 纬度
        }
      }
    ];
  }
  
  getCors() {
    return new Promise((resolve, reject) => {
        $.getScript('http://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=8YLHnkTizZqm7ChWM6NQjw7Ui40PXy8z&callback=showLocation', (res, status) => {
            if(status === 'success') {
                resolve(status)
            } else {
                reject(status)
            }  
        });
    })

  }
}
