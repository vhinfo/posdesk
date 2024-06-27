import { BaseEntity } from './BaseEntity';

export class User extends BaseEntity {
    id: number;
    name: string;
    login: string;
    accessToken: string;
    profession: string;
    isManager: boolean;
    image: string;
    cashierId: number;
    cashierName: string;

    static tableName = 'users';
    static fields = [
        { name: 'name', type: 'TEXT NOT NULL' },
        { name: 'login', type: 'TEXT NOT NULL UNIQUE' },
        { name: 'accessToken', type: 'TEXT NOT NULL' },
        { name: 'profession', type: 'TEXT' },
        { name: 'isManager', type: 'INTEGER' },
        { name: 'image', type: 'TEXT' },
        { name: 'cashierId', type: 'INTEGER' },
        { name: 'cashierName', type: 'TEXT' }
    ];

    constructor(userData: {
        id: number,
        name: string,
        login: string,
        accessToken: string,
        profession: string,
        isManager: boolean,
        image: string,
        cashierId: number,
        cashierName: string
    }) {
        super();
        this.id = userData.id;
        this.name = userData.name;
        this.login = userData.login;
        this.accessToken = userData.accessToken;
        this.profession = userData.profession;
        this.isManager = userData.isManager;
        this.image = userData.image;
        this.cashierId = userData.cashierId;
        this.cashierName = userData.cashierName;
    }
}
