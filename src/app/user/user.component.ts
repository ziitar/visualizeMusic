import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Form } from '@angular/forms';

import { UserService } from '../service/user.service';
import {User} from '../class/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() user = new EventEmitter<User>();
  isLogin = true;
  loginHelp = {
    userName: '',
    userPassword: ''
  };
  registerHelp = {
    userName: '',
    userPassword: '',
    checkPassword: '',
    userEmail: ''
  };
  model= { name: '', password: '', email: ''};
  loginMessage: string;
  registerMessage: string;
  constructor(private userService: UserService ) { }

  ngOnInit() {

  }
  login() {
    this.isLogin = true;
  }
  register() {
    this.isLogin = false;
  }
  /*
  *   登录
  * */
  onLogin() {
    this.userService.login(this.model)
      .then(res => {
        if (res !== 'false') {
          this.user.emit(JSON.parse(res) as User);
          this.loginMessage = '登录成功，关闭弹框';
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  /*
  *   注册
  * */
  onRegister() {
    this.userService.register(this.model)
      .then(res => {
        if (res !== 'false') {
          this.user.emit(JSON.parse(res) as User);
          this.registerMessage = '注册成功，关闭弹框';
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  /*
  *   检查用户名是否存在
  * */
  checkUserName() {
    return this.userService.chickName(this.model.name)
      .then(res => {
        if (res !== 'true') {
          this.registerHelp.userName = '用户名已存在';
        }
      });
  }
  closeModal() {
    this.loginMessage = null;
    this.registerMessage = null;
  }
}
