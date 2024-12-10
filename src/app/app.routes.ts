import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/common/home/home.component';
import { CompanylistComponent } from './component/company/companylist/companylist.component';
import { CreatecompanyComponent } from './component/company/createcompany/createcompany.component';
import { PropertylistComponent } from './component/property/propertylist/propertylist.component';
import { CreatepropertyComponent } from './component/property/createproperty/createproperty.component';
import { PersonlistComponent } from './component/person/personlist/personlist.component';
import { CreatepersonComponent } from './component/person/createperson/createperson.component';
import { LoginComponent } from './component/common/login/login.component';
import { authGuard } from './_guard/auth.guard';
import { TranslistComponent } from './component/transaction/translist/translist.component';
import { CreatetransComponent } from './component/transaction/createtrans/createtrans.component';
import { TenantlistComponent } from './component/tenant/tenantlist/tenantlist.component';
import { CreatetenantComponent } from './component/tenant/createtenant/createtenant.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent,canActivate:[authGuard]
    },
    {
        path: 'company-list', component: CompanylistComponent,canActivate:[authGuard]
    },
    {
        path: 'create-company', component: CreatecompanyComponent,canActivate:[authGuard]
    },
    {
        path: 'update-company/:id', component: CreatecompanyComponent,canActivate:[authGuard]
    },
    {
        path: 'property-list', component: PropertylistComponent,canActivate:[authGuard]
    },
    {
        path: 'create-property', component: CreatepropertyComponent,canActivate:[authGuard]
    },
    {
        path: 'update-property/:id', component: CreatepropertyComponent,canActivate:[authGuard]
    },
    {
        path: 'company/:companyid/persons', component: PersonlistComponent,canActivate:[authGuard]
    },
    {
        path: 'company/:companyid/create-person', component: CreatepersonComponent,canActivate:[authGuard]
    },
    {
        path: 'company/:companyid/update-person/:id', component: CreatepersonComponent,canActivate:[authGuard]
    },
    {
        path: 'create-person', component: CreatepersonComponent,canActivate:[authGuard]
    },
    {
        path: 'update-person/:id', component: CreatepersonComponent,canActivate:[authGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'tenant-list', component: TenantlistComponent,canActivate:[authGuard]
    },
    {
        path: 'create-tenant', component: CreatetenantComponent,canActivate:[authGuard]
    },
    {
        path: 'update-tenant/:id', component: CreatetenantComponent,canActivate:[authGuard]
    },
    {
        path: 'trans-list', component: TranslistComponent,canActivate:[authGuard]
    },
    {
        path: 'rentpay', component: CreatetransComponent,canActivate:[authGuard]
    },
    {
        path: 'expense', component: CreatetransComponent,canActivate:[authGuard]
    },
    {
        path: 'update-trans/:id', component: CreatetransComponent,canActivate:[authGuard]
    }
    
];
