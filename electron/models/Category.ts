import { BaseEntity } from './BaseEntity';

export class Category extends BaseEntity {
    id: number;
    name: string;

    static tableName = 'categories';
    static fields = [
        { name: 'name', type: 'TEXT NOT NULL' }
    ];

    constructor(categoryData: {
        id: number,
        name: string
    }) {
        super();
        this.id = categoryData.id;
        this.name = categoryData.name;
    }
}
