const initialProjects = [
    {
        name: 'Events Toronto',
        type: 'Vue app',
        link: 'http://events-toronto.herokuapp.com',
        steps: []
    },
    {
        name: 'Movie Paradise',
        type: 'Angular App',
        link: 'https://movie-angular.herokuapp.com/',
        steps: [
            'Upgraded to Angular 6 recently to keep up to date with core module',
            'Built with reusable components',
            'Use themoviedb api to popular movie data',
            'Use Nodejs as backend host on Heroku'
        ]
    },
    {
        name: 'La Promesse',
        type: 'Admin Dashboard',
        link: 'http://lapromesseca.com/admin',
        steps: [
            'Create SPA with react and react router',
            'Build reusable and extensible react components',
            'Implement Bulma CSS framework with flexbox',
            'Create RESTful API with PHP'
        ]
    },
    {
        name: 'Where We Work',
        type: 'Web application',
        link: 'https://where-we-work.herokuapp.com/',
        steps: [
            'Create SPA with Vue, Vue router, Vue Resource, Vuex',
            'Build reusable and extensible Vue components',
            'Implement style with Material Style',
            'Create RESTful API with NodeJs, Express and MongoDB'
        ]
    },
    {
        name: 'Site Favourite',
        link: 'https://favourite-site.herokuapp.com/',
        type: 'Web Application',
        steps: [
            'Create restful api using Postgresql with ruby on rails',
            'Implement model relationships',
            'Write reusable react components on Rails'
        ]
    },
    // {
    //     name: 'Events Toronto',
    //     link: 'http://events-toronto.herokuapp.com/',
    //     type: 'Web Application',
    //     steps: [
    //         'Retrieve data from Toronto open source with cron job daily',
    //         'Implement Google Oauth with authentication',
    //         'Increase user experience with AngularJS'
    //     ]
    // }
];

const projects = (state = initialProjects, action) => {
    return state;
};
export default projects;