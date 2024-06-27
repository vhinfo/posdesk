import { BaseEntity } from './BaseEntity';

export class Store extends BaseEntity {
    id: number;
    name: string;
    type: string;
    abbreviation: string;
    groupId: number;
    groupName: string;

    static tableName = 'stores';
    static fields = [
        { name: 'storeId', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'type', type: 'TEXT' },
        { name: 'abbreviation', type: 'TEXT' },
        { name: 'groupId', type: 'INTEGER' },
        { name: 'groupName', type: 'TEXT' }
    ];

    constructor(storeData: {
        id: number,
        name: string,
        type: string,
        abbreviation: string,
        groupId: number,
        groupName: string
    }) {
        super();
        this.id = storeData.id;
        this.name = storeData.name;
        this.type = storeData.type;
        this.abbreviation = storeData.abbreviation;
        this.groupId = storeData.groupId;
        this.groupName = storeData.groupName;
    }
}
