export interface User {
        UserId: string;
        UserNameEmail: string;
        FirstName: string | null;
        MiddleName: string | null;
        LastName: string | null;
        CreatedDT: Date;
        CreatedById: string | null;
        CreatedByName: string | null;
        LastModifiedDT: Date;
        LastModifiedById: string | null;
        LastModifiedByName: string | null;
        Lists?: GroceryList[];
}

export interface GroceryList {
        GroceryListId?: string | null;
        Name: string | null;
        UserId?: string;
        CreatedDT?: Date;
        CreatedById?: string | null;
        CreatedByName?: string | null;
        LastModifiedDT?: Date;
        LastModifiedById?: string | null;
        LastModifiedByName?: string | null;
        GroceryItems?: GroceryItem [];
}

export interface GroceryItem {
        GroceryItemId?: string;
        ItemName: string | null;
        DoneTF?: boolean;
        CreatedDT?: Date;
        CreatedById?: string | null;
        CreatedByName?: string | null;
        LastModifiedDT?: Date;
        LastModifiedById?: string | null;
        LastModifiedByName?: string | null;
}