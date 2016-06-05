interface AppSidebarItem {
    header:string;
    menuItems?:[{
        label:string,
        route:string[]
    }]
}
