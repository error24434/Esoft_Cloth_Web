import { SharedModule } from './../../shared/shared.module';
import { ShopModule } from './../shop/shop.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MainLandingComponent } from './components/main-landing/main-landing.component';
import { BannerComponent } from './components/banner/banner.component';
import { SmBannerComponent } from './components/sm-banner/sm-banner.component';





@NgModule({
  declarations: [
    HomeComponent,
    MainLandingComponent,
    BannerComponent,
    SmBannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShopModule,
    SharedModule
  ]
})
export class HomeModule { }
