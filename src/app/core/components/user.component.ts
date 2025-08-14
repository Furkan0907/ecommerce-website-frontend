import { UserService } from './../services/user.service';
import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  template: `
    <div *ngIf="loading">Yükleniyor...</div>
    <div *ngIf="error" class="text-danger">{{ error }}</div>
    <div *ngIf="user">
      <h2>Kullanıcı Detayları</h2>
      <p><strong>Kullanıcı Adı:</strong> {{ user?.username }}</p>
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <p><strong>Rol:</strong> {{ user?.role }}</p>
      <p><strong>Durum:</strong> {{ user?.isBanned ? 'Engelli' : 'Aktif' }}</p>
    </div>
  `
})
export class UserComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (!id) {
        this.error = 'Geçersiz kullanıcı ID';
        return;
      }

      this.loading = true;
      this.userService.getById(id).subscribe({
        next: (res) => {
          this.user = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Kullanıcı yüklenirken hata oluştu';
          this.loading = false;
          console.log(err);
        }
      });
  }
}
