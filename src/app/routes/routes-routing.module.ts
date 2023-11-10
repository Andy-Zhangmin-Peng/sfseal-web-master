import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'department-management', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘' } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      {
        path: 'staff-management',
        loadChildren: () => import('./staff-management/staff-management.module').then(m => m.StaffManagementModule),
      },
      {
        path: 'department-management',
        loadChildren: () => import('./department-management/department-management.module').then(m => m.DepartmentManagementModule),
      },
      {
        path: 'company-management',
        loadChildren: () => import('./company-management/company-management.module').then(m => m.CompanyManagementModule),
      },
      {
        path: 'lock-management',
        loadChildren: () => import('./lock-management/lock-management.module').then(m => m.LockManagementModule),
      },
      {
        path: 'dispense-management',
        loadChildren: () => import('./dispense-management/dispense-management.module').then(m => m.DispenseManagementModule),
      },
      {
        path: 'inventory-management',
        loadChildren: () => import('./inventory-management/inventory-management.module').then(m => m.InventoryManagementModule),
      },
      {
        path: 'work-order-management',
        loadChildren: () => import('./work-order-management/work-order-management.module').then(m => m.WorkOrderManagementModule),
      },
      {
        path: 'exceptional-situation-management',
        loadChildren: () => import('./exceptional-situation-management/exceptional-situation-management.module').then(m => m.ExceptionalSituationManagementModule),
      },
      {
        path: 'import-record-management',
        loadChildren: () => import('./import-record-management/import-record-management.module').then(m => m.ImportRecordManagementModule),
      },
      {
        path: 'user-management',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
      },
      {
        path: 'company-info',
        loadChildren: () => import('./company-info/company-info.module').then(m => m.CompanyInfoModule),
      },
      {
        path: 'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
      }
    ],
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
