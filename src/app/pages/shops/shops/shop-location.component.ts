import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DxMapComponent } from 'devextreme-angular';


@Component({
    template: `
        <div>
            <dx-map #shopMap
                provider="bing"
                [zoom]="4"
                center="39.8283, -98.5795"
                [height]="700"
                width="100%"
                [controls]="true"
                markerIconSrc="https://content.app-us1.com/n569w/2023/02/03/963f8ccd-f173-4859-941e-f60892a13087.png"
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
                this.formatLocations();
            });
            this.markers = this.formattedLocations;
        }

        ngOnDestroy(): void {
            this.sub.unsubscribe();
        }

        formatLocations() {
            this.locations.forEach(shop => {

                let location = (!shop.location.latitude && !shop.location.longitude)
                    ?`${shop.location.address} ${shop.location.city}, ${shop.location.state} ${shop.location.zip}`
                    : [shop.location.latitude,shop.location.longitude];

                this.formattedLocations.push({
                    location: location,
                    tooltip: {
                        isShown: false,
                        text: shop.name,
                    }
                })
            });
        }

        // Get rid of once Maps is completely set up using coordinates
        delayedMarkerAdd(i) {
            setTimeout(() => {
                this.addMarkers(i);
            }, 1300);
        }

        // Get rid of once Maps is completely set up using coordinates
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