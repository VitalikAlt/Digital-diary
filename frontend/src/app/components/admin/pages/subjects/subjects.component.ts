import { Component, OnInit, EventEmitter, ViewChild } from "@angular/core";
import { MaterializeAction, toast } from "angular2-materialize";
import { HttpService } from "../../../../services/http.service";
import { FadeInOutAnimation } from "../../../../animations/FadeInOutAnimation";
import { UpdateMarksModal } from "../../../../modals/admin/subjects/update-marks/update.component";

@Component({
  selector: "app-admin-subjects",
  templateUrl: "subjects.component.html",
  styleUrls: ["subjects.component.css"],
  animations: [FadeInOutAnimation]
})
export class AdminSubjectsComponent implements OnInit {
  @ViewChild("updateMarksModal") updateMarksModal;

  public addDisciplineModal = new EventEmitter<string | MaterializeAction>();
  public editSubjectModal = new EventEmitter<string | MaterializeAction>();
  public deleteSubjectModal = new EventEmitter<string | MaterializeAction>();

  public disciplineName: string = "";
  public teacherSearch: string = "";
  public selectedItem: any;

  public groupCourseSearch: string = "";
  public groupSquadSearch: string = "";
  public groupAssignedSearch: boolean = false;
  public groupAssignedSearchPower: boolean = false;

  //*****************************************************************************
  public addSubjectData: any;
  public selectedSubject: any;

  public subjectsSorts: [string, boolean] = ["name", false];
  public subjectFilters: { name; teacher } = { name: "", teacher: "" };

  public teacherFilters: { name } = { name: "" };

  public groupSorts: [string, boolean] = ["course", false];
  public groupFilters: { course; squad } = { course: "", squad: "" };

  //*************************************************************************

  public subjects: Array<Object> = [];
  public teachers: Array<Object> = [];
  public groups: Array<Object> = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.addSubjectData = {};
    this.selectedSubject = {};

    this.httpService.getSubjectList().subscribe(
      subjects => {
        this.subjects = subjects;
      },
      error => {
        toast("Неизвестная ошибка!", 4000, "error-toast");
        console.log(error);
      }
    );
  }

  addSubject() {
    if (!this.addSubjectData.teacher)
      return toast("Преподаватель не найден!", 4000, "error-toast");

    this.httpService
      .addSubject(this.addSubjectData.name, this.addSubjectData.teacher.id)
      .subscribe(
        id => {
          this.subjects.push({
            id,
            name: this.addSubjectData.name,
            teacher: this.addSubjectData.teacher.name
          });
          toast("Дисциплина добавлена!", 4000, "success-toast");
          this.teacherFilters.name = "";
          this.closeModalDisciplineAdd();
        },
        error => {
          if (error === "No user with that id!")
            return toast(
              "Преподаватель не найден, обновите страницу!",
              4000,
              "error-toast"
            );

          toast("Неизвестная ошибка!", 4000, "error-toast");
          console.log(error);
        }
      );
  }

  updateSubjects() {
    const assignedGroupIds = [];

    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i]["assigned"])
        assignedGroupIds.push(this.groups[i]["id"]);
    }

    this.httpService
      .updateSubjectGroups(this.selectedSubject.id, assignedGroupIds)
      .subscribe(
        () => {
          toast("Группы обновленны!", 4000, "success-toast");
          this.closeModalSubjectEdit();
        },
        error => {
          toast("Неизвестная ошибка!", 4000, "error-toast");
          console.log(error);
        }
      );
  }

  deleteSubject() {
    this.httpService.deleteSubject(this.selectedSubject.id).subscribe(
      () => {
        this.ngOnInit();
        toast("Дисциплина удалена!", 4000, "success-toast");
        this.closeModalSubjectDelete();
      },
      error => {
        toast("Неизвестная ошибка!", 4000, "error-toast");
        console.log(error);
      }
    );
  }

  openModalDisciplineAdd() {
    this.httpService.getTeacherList().subscribe(
      teachers => {
        this.teachers = teachers;
        this.addDisciplineModal.emit({ action: "modal", params: ["open"] });
      },
      error => {
        toast("Неизвестная ошибка!", 4000, "error-toast");
        console.log(error);
      }
    );
  }

  closeModalDisciplineAdd() {
    this.addDisciplineModal.emit({ action: "modal", params: ["close"] });
  }

  openModalSubjectEdit() {
    this.httpService.getGroupsByDisciplineId(this.selectedSubject.id).subscribe(
      groups => {
        this.groups = groups;
        this.editSubjectModal.emit({ action: "modal", params: ["open"] });
      },
      error => {
        toast("Неизвестная ошибка!", 4000, "error-toast");
        console.log(error);
      }
    );
  }

  closeModalSubjectEdit() {
    this.editSubjectModal.emit({ action: "modal", params: ["close"] });
  }

  openModalSubjectMarksEdit() {}

  openModalSubjectDelete() {
    this.deleteSubjectModal.emit({ action: "modal", params: ["open"] });
  }

  closeModalSubjectDelete() {
    this.deleteSubjectModal.emit({ action: "modal", params: ["close"] });
  }

  changeSubjectSort(type: string) {
    this.changeSort(this.subjectsSorts, type);
  }

  changeGroupSort(type: string) {
    this.changeSort(this.groupSorts, type);
  }

  changeSort(sort: Object, newType: string) {
    sort[1] = sort[0] === newType ? !sort[1] : false;
    sort[0] = newType;
  }
}
