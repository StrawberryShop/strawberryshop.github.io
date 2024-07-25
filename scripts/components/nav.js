import { onMounted } from '../../plugins/vue3.4.33.js'

const template = `
<div id="nav">
    <div id="title">{{title}}</div>
    <ul class="menu">
        <li v-for="menuItem in leftMenuItems" class="menu-item">
            <span
                :class="isActive(menuItem.name)? 'active':'deactive'"
                @click="handleOnClickItem(menuItem.name)"
            >
                <ion-icon
                    :name="menuItem.icon"
                >
                </ion-icon>
                <span>&nbsp;{{menuItem.name}}</span>
            </span>
        </li>
    </ul>
    <div class="space"></div>
    <ul class="menu">
        <li v-for="menuItem in rightMenuItems" class="menu-item">
            <span
                class="deactive"
                @click="handleNavigateTo(menuItem.href)"
            >
                <ion-icon
                    class="icon"
                    :name="menuItem.icon"
                >
                </ion-icon>
                <span>&nbsp;{{menuItem.name}}</span>
            </span>
        </li>
    </ul>
</div>
`

export default {
    props: {
        currentPage: String
    },
    setup(props, { emit }) {
        // property
        const title = 'Strawberry Shop'
        const leftMenuItems = [
            {
                icon: 'home-outline',
                name: 'Home'
            },
            {
                icon: 'library-outline',
                name: 'Archieve'
            },
            {
                icon: 'document-outline',
                name: 'About'
            },
            {
                icon: 'link-outline',
                name: 'Link'
            }
        ]
        const rightMenuItems = [
            {
                icon: 'logo-github',
                name: 'Github',
                href: 'https://github.com/StrawberryShop'
            }
        ]
        // method
        const isActive = (name) => {
            return props.currentPage == name
        }
        const handleOnClickItem = (name) => {
            emit('navigateTo', name)
        }
        const handleNavigateTo = (href) => {
            window.open(href)
        }

        // lifehook
        onMounted(() => {
            let storeCurrentPage = window.localStorage.getItem('currentPage')
            if (storeCurrentPage) {
                emit('navigateTo', storeCurrentPage)
            } else {
                emit('navigateTo', 'Home')
            }
        })
        return {
            // property
            title,
            leftMenuItems,
            rightMenuItems,
            // method
            isActive,
            handleOnClickItem,
            handleNavigateTo
        }
    },
    template: template
}
