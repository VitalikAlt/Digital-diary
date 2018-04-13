import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from "./app-routing.module";
import { NgSpinningPreloader } from 'ng2-spinning-preloader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserService1 } from './user.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { Preloader } from './services/preloader.service';
import { AuthGuard } from './services/auth_guard.service';

import { AuthComponent } from './components/auth/auth.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AdminResetComponent } from './components/admin-reset/admin-reset.component';

import { StudentComponent } from './components/student/student.component';
import { StudentProfileComponent } from './components/student/pages/student-profile/student-profile.component';
import { StudentProgressComponent } from './components/student/pages/student-progress/student-progress.component'
import { StudentMissesComponent } from './components/student/pages/misses/misses.component';
import { StudentScheduleComponent } from './components/student/pages/student-schedule/student-schedule.component';
import { StudentSettingsComponent } from './components/student/pages/settings/settings.component';

import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherProfileComponent } from './components/teacher/pages/profile/profile.component';
import { TeacherJournalComponent } from './components/teacher/pages/journal/journal.component';
import { TeacherMissesComponent } from './components/teacher/pages/misses/misses.component';
import { TeacherScheduleComponent } from './components/teacher/pages/schedule/schedule.component';
import { TeacherReportsComponent } from './components/teacher/pages/reports/reports.component';
import { TeacherSettingsComponent } from './components/teacher/pages/settings/settings.component';

import { AdminComponent } from './components/admin/admin.component';
import { AdminGroupsComponent } from './components/admin/pages/groups/groups.component';
import { AdminListsComponent } from './components/admin/pages/lists/lists.component';
import { StudentListComponent } from './components/admin/pages/lists/pages/student/student.component';
import { TeacherListComponent } from './components/admin/pages/lists/pages/teacher/teacher.component';
import { AdminSubjectsComponent } from './components/admin/pages/subjects/subjects.component';
import { AdminMissesComponent } from './components/admin/pages/misses/misses.component';
import { AdminScheduleComponent } from './components/admin/pages/schedule/schedule.component';

import { UpdateStudentModal } from './modals/admin/lists/student/update/update.component';
import { UpdateTeacherModal } from './modals/admin/lists/teacher/update/update.component';
import { UpdateMarksModal } from './modals/admin/subjects/update-marks/update.component';

import { ArraySortPipe } from './pipes/orderBy';
import { ArrayFilterPipe } from './pipes/filterBy';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,

    PageNotFoundComponent,

    AdminResetComponent,

    StudentComponent,
    StudentProfileComponent,
    StudentProgressComponent,
    StudentMissesComponent,
    StudentScheduleComponent,
    StudentSettingsComponent,

    TeacherComponent,
    TeacherProfileComponent,
    TeacherJournalComponent,
    TeacherMissesComponent,
    TeacherScheduleComponent,
    TeacherReportsComponent,
    TeacherSettingsComponent,

    AdminComponent,
    AdminGroupsComponent,
    AdminListsComponent,
    StudentListComponent,
    TeacherListComponent,
    AdminSubjectsComponent,
    AdminMissesComponent,
    AdminScheduleComponent,

    ArraySortPipe,
    ArrayFilterPipe,

    UpdateStudentModal,
    UpdateTeacherModal,
    UpdateMarksModal

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterializeModule,
    BrowserAnimationsModule
  ],
  providers: [
    NgSpinningPreloader,
    UserService1,
    UserService,
    HttpService,
    AuthGuard,
    Preloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
