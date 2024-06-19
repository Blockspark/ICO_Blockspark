// assets
import { IconKey,IconUserCheck,IconList,IconFileCheck } from '@tabler/icons';

// constant
const icons = {
    IconKey,IconUserCheck,IconList,IconFileCheck
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Application',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'userList',
            title: 'Users',
            type: 'item',
            icon: icons.IconUserCheck,
            url: '/user-list'
             
        },
        {
            id: 'WhitelistedUsers',
            title: 'Whitelisted Users',
            type: 'item',
            icon: icons.IconList,
            url: '/whitelisted-user-list'
             
        }
        
    ]
};

export default pages;
