import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

// Component
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { AllPostsComponent } from './all-posts/all-posts.component'
import { FollowingComponent } from './following/following.component'
import { FavoritesComponent } from './favorites/favorites.component'
import { MyPostsComponent } from './my-posts/my-posts.component'
import { SignUpComponent } from './auth/sign-up/sign-up.component'
import { LoginComponent } from './auth/login/login.component'
import { HomeComponent } from './home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { RouteGuard } from './auth/route-guard'
import { NotificationComponent } from './notification/notification.component'

// Services
import { NotificationService } from './shared/notification.service'
import { MyfireService } from './shared/myfire.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FollowingComponent,
    FavoritesComponent,
    MyPostsComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard, NotificationService, MyfireService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
