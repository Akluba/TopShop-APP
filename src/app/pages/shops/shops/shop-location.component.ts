import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DxMapComponent } from 'devextreme-angular';


@Component({
    template: `
        <div>
            <dx-map #shopMap
                (onReady)= "delayedMarkerAdd(0)"
                provider="bing"
                [zoom]="4"
                center="39.8283, -98.5795"
                [height]="600"
                width="100%"
                [controls]="true"
                markerIconSrc="https://content.app-us1.com/n569w/2023/02/02/db0ba3a9-a94b-43c1-972a-c821c01aab52.png"
                [markers]="markers">
            </dx-map>
        </div>
    `})
    export class ShopLocationComponent implements OnInit, OnDestroy {
        locations: any;
        formattedLocations: any[] = [];
        markers: any[] = [];
        private sub: Subscription;

        @ViewChild('shopMap') map: DxMapComponent;

        constructor(private _route: ActivatedRoute) {}

        ngOnInit(): void {
            this.sub = this._route.data.subscribe(data => {
                this.locations = data.response.data;
            });

            this.formatLocations();
        }

        ngOnDestroy(): void {
            this.sub.unsubscribe();
        }

        formatLocations() {
            this.locations.forEach(shop => {
                this.formattedLocations.push({
                    location: `${shop.location.address} ${shop.location.city}, ${shop.location.state} ${shop.location.zip}`,
                    tooltip: {
                        isShown: false,
                        text: shop.name,
                    }
                })
            });
        }

        delayedMarkerAdd(i) {
            setTimeout(() => {
                this.addMarkers(i);
            }, 1200);
        }

        addMarkers(i) {
            const map = this.map.instance;
            let locationCollection = [];

            for(let l=i; l<i+5; l++){
                locationCollection.push(this.formattedLocations[l])
                if(l === this.formattedLocations.length+1) break;
            }

            map.addMarker(locationCollection);

            i +=5;

            if (i<this.formattedLocations.length) { this.delayedMarkerAdd(i); }
        }
    }