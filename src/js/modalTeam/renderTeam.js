import team from './teamData.json';

const refs = {
    teamList: document.querySelector(".team-members__list")
}

function createCardTemplate({ name, position, photo, github, mail, phone }) {
    return `
            <li class="team-members__item">
                <img src="${photo}" alt="${name}" width="120" height="120"
                    class="team-members__photo">
            
                <div class="team-members__wrapper">
                    <h2 class="team-members__header">${name}</h2>
                    <p class="team-members__text">${position}</p>
            
                    <ul class="social-list list">
                        <li class="social-list__item">
                            <a href="${github}" target="_blank" class="social-list__link">
                                <svg viewBox="0 0 32 32" width="24" height="24">
                                    <path d="M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z"></path>
                                </svg>
                            </a>
                        </li>
                        
                        <li class="social-list__item">
                            <a href="mailto:${mail}" class="social-list__link">
                               <svg viewBox="0 0 32 32" width="24" height="24">
                                    <path d="M29 4h-26c-1.65 0-3 1.35-3 3v20c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-20c0-1.65-1.35-3-3-3zM12.461 17.199l-8.461 6.59v-15.676l8.461 9.086zM5.512 8h20.976l-10.488 7.875-10.488-7.875zM12.79 17.553l3.21 3.447 3.21-3.447 6.58 8.447h-19.579l6.58-8.447zM19.539 17.199l8.461-9.086v15.676l-8.461-6.59z"></path>
                                </svg>
                            </a>
                        </li>

                        <li class="social-list__item">
                            <a href="tel:${phone}" class="social-list__link">
                                <svg viewBox="0 0 32 32" width="24" height="24">
                                    <path
                                        <path d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"></path>
                                    </path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
    `
};

function renderTeamCard(items) {
    const markup = items.map(createCardTemplate).join('');
    return refs.teamList.insertAdjacentHTML('beforeend', markup)
};

renderTeamCard(team);
