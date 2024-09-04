import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Correct import for CommonModule

@Component({
    selector: 'app-group',
    standalone: true,
    imports: [CommonModule], // Ensure CommonModule is imported
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    groups: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get('/server/data/group.json').subscribe(
            (data: any) => {
                this.groups = data;
            },
            (error) => {
                console.error('Error loading group.json', error);
            }
        );
    }

    selectGroup(groupId: number): void {
        console.log(`Group selected: ${groupId}`);
        // Add your logic here for selecting the group
    }
}
