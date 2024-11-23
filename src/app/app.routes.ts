import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/common/home/home.component';
import { CompanylistComponent } from './component/company/companylist/companylist.component';
import { CreatecompanyComponent } from './component/company/createcompany/createcompany.component';
import { PropertylistComponent } from './component/property/propertylist/propertylist.component';
import { CreatepropertyComponent } from './component/property/createproperty/createproperty.component';
import { PersonlistComponent } from './component/person/personlist/personlist.component';
import { CreatepersonComponent } from './component/person/createperson/createperson.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'company-list', component: CompanylistComponent
    },
    {
        path: 'create-company', component: CreatecompanyComponent
    },
    {
        path: 'update-company/:id', component: CreatecompanyComponent
    },
    {
        path: 'property-list', component: PropertylistComponent
    },
    {
        path: 'create-property', component: CreatepropertyComponent
    },
    {
        path: 'update-property/:id', component: CreatepropertyComponent
    },
    {
        path: 'company/:companyid/persons', component: PersonlistComponent
    },
    {
        path: 'company/:companyid/create-person', component: CreatepersonComponent
    },
    {
        path: 'company/:companyid/update-person/:id', component: CreatepersonComponent
    },
    {
        path: 'create-person', component: CreatepersonComponent
    },
    {
        path: 'update-person/:id', component: CreatepersonComponent
    }
];
