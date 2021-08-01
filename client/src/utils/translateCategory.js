
export default (EnCategory)=>{
    console.log(EnCategory)
    switch (EnCategory) {

        case 'gardenFurnitures':
            return "ריהוט גן";
            case 'picnicItems':
            return "מוצרי פיקניק";
            case 'outKitchen':
            return "מטבח חוץ";
            case 'games':
            return "משחקי חצר ואטרקציות";
            case 'decorativeItems':
            return "אביזרי נוי"
        default:
            break;
    }
}