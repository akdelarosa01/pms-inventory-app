interface InventoryInterface {
    id: number;
    item: string;
    item_code: string;
    item_desc: string;
    item_category: string;
    item_type: string;
    item_id: number;
    warehouse:string;
    quantity: number;
    weight: number;
    length: number;
    width: number;
    heat_no:string;
    lot_no:string;
    sc_no:string;
    supplier:string;
    supplier_heat_no:string;
    material_used:string;
    weight_received: number;
    is_excess: number;
    create_user: number;
    update_user: number;
}