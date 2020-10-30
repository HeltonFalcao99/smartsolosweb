import {Component, OnInit} from '@angular/core';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CoreService} from '../../service/core/core.service';

@Component({
    selector: 'ms-project-list',
    templateUrl: './help-list.component.html',
    styleUrls: ['./help-list.component.scss']
})
export class HelpListComponent implements OnInit {
    safe: SafeResourceUrl;

    constructor(private toastr: ToastrService,
                private pageTitleService: PageTitleService, public sanitizer: DomSanitizer, private coreService: CoreService,
                public router: Router) {
        this.coreService.winProject = false;
        this.coreService.winSinc = false;

    }

    ngOnInit() {
        this.pageTitleService.setTitle('Tutorial');
        const url = environment.apiWeb + 'documentos/' + environment.documentHelp;
        this.safe = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    }

}
