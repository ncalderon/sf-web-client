import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";

@Component({
    selector: 'jhi-tran-file-reader',
    templateUrl: './tran-file-reader.component.html',
    styles: []
})
export class TranFileReaderComponent implements OnInit {

    fileReaderForm: FormGroup;

    fileInput: any;
    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    constructor(
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    ngOnInit() {

    }

    createForm() {
        this.fileReaderForm = this.fb.group({
            bank: [null, Validators.required]
           ,tranFile: [null, Validators.required]
        });
    }

}
