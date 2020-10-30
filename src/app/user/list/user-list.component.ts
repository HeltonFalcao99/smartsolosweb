import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CoreService} from '../../service/core/core.service';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ms-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    popUpDeleteUserResponse: any;
    userlist: any;

    displayedColumns: string [] = ['name', 'login', 'action'];
    dataSource = new MatTableDataSource<any>(this.userlist);

    selection = new SelectionModel<any>(true, []);

    constructor(private coreService: CoreService,
                private pageTitleService: PageTitleService, private toastr: ToastrService,
                private router: Router) {
        this.coreService.winProject = false;
        this.coreService.winSinc = false;

    }


    ngOnInit() {
        this.pageTitleService.setTitle('Usuário');
        this.dataSource.paginator = this.paginator;
        this.coreService.getUserList().subscribe(res => {
                this.userlist = res;
            },
            err => console.log(err),
            () => this.getUserList(this.userlist)
        );

    }


    getUserList(res) {
        if (res.status === 200) {
            this.userlist = res.data;
        }

        this.dataSource = new MatTableDataSource<any>(this.userlist);
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
        }, 0)
    }

    /**
     * addNewUserDialog method is used to open a add new user dialog.
     */
    addNewUserDialog() {
        this.router.navigate(['./usuario/formulario']);
    }

    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(i) {

        const data = {
            titulo: 'Remover Usuário (' + this.userlist[i]['name'] + ')',
            conteudo: 'Tem certeza que deseja remover o usuário?'
        };

        this.coreService.deleteDialog(data).subscribe(res => {
                this.popUpDeleteUserResponse = res
            },
            err => console.log(err),
            () => this.getDeleteResponse(this.popUpDeleteUserResponse, i))
    }

    /**
     * getDeleteResponse method is used to delete a user from the user list.
     */
    getDeleteResponse(response: string, i) {
        if (response === 'yes') {
            const body = {
                blocked: 1
            };
            this.coreService.putUser(body, this.userlist[i]['id']).subscribe(res => {
                    if (res['status'] === 200) {
                        this.dataSource.data.splice(i, 1);
                        this.dataSource = new MatTableDataSource(this.dataSource.data);
                        this.toastr.success('Registro removido com sucesso!');
                    }
                },
                err => this.toastr.error('Houve um problema ao remover o registro!')
            );
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onEdit(data, index) {
        this.router.navigate(['./usuario/formulario/', data.id]);
    }
}
