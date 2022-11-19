import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserModel } from '../../models/AuthUserModel';
import { RegisterCommand } from '../../models/Commands/RegisterCommand';
import { FileUploadService } from '../../services/file-uploader.service';
import { RegisterService } from '../../services/register.service';
import { Security } from '../../utils/security.util';
import { Util } from '../../utils/util';
import { FileUploadComponent } from './file-uploader/file-uploader.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = false;
  isDisabled: boolean = false;
  public photo: any = null;
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any = null; // Variable to store file

  constructor(private fb: FormBuilder,
    public registerService: RegisterService,
    public fileUploadService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onRegister() {
    if (!this.registerForm.valid || this.photo == null) {
      return;
    }

    var registerData = this.registerForm.getRawValue() as RegisterCommand;
    registerData.profilePhoto = this.photo;

    this.isDisabled = true;

    this.registerService.registerUser(registerData)
      .subscribe(
        token => {
          var user = new AuthUserModel(token.data);
          Security.set(user, token.data);
          this.router.navigate(['/home'])
        },
        erro => {
          Security.clear()
        })
  }

  // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];
    Util.getBase64(this.file).then( x =>
    {
      this.photo = x;
    })
    this.showPreview()
  }

  showPreview() {
    document.getElementById("avatar")?.removeAttribute("hidden")
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    //this.fileUploadService.upload(this.file).subscribe(
    //  (event: any) => {
    //    if (typeof (event) === 'object') {

    //      // Short link via api response
    //      this.shortLink = event.link;

    //      this.loading = false; // Flag variable
    //    }
    //  }
    //);
  }

}

