document.addEventListener('DOMContentLoaded', () => {
    let projectsData2025Cache = null;
    let projectsData2026Cache = null;
    let newsDataCache = null;

    const getProjectsData2025 = async () => {
        if (!projectsData2025Cache) {
            const module = await import('./data-projects-2025');
            projectsData2025Cache = module.projectsData2025;
        }

        return projectsData2025Cache;
    };

    const getProjectsData2026 = async () => {
        if (!projectsData2026Cache) {
            const module = await import('./data-projects-2026');
            projectsData2026Cache = module.projectsData2026;
        }

        return projectsData2026Cache;
    };

    const getNewsData = async () => {
        if (!newsDataCache) {
            const module = await import('./data-news');
            newsDataCache = module.newsData;
        }

        return newsDataCache;
    };

    const sectionLabels = {
        es: {
            1: 'Last push',
            2: 'Films to come',
            3: 'Series',
            4: 'Forum Cortos',
        },
        en: {
            1: 'Last Push',
            2: 'Films to Come',
            3: 'Series',
            4: 'Forum Shorts',
        },
    };

    const sharedFieldLabels = {
        es: {
            director: 'Dirección:',
            producer: 'Producción:',
            company: 'Compañías productoras:',
            script: 'Guion:',
            duration: 'Duración:',
            budget: 'Presupuesto total:',
            back: 'Volver',
        },
        en: {
            director: 'Director:',
            producer: 'Producer:',
            company: 'Production companies:',
            script: 'Script:',
            duration: 'Duration:',
            budget: 'Total budget:',
            back: 'Back',
        },
    };

    const baseUrl = '';
    const section = document.getElementById('section');
    const title = document.getElementById('title');
    const titleEn = document.getElementById('titleEn');
    const img = document.getElementById('img');
    const imgDirector = document.getElementById('img_director');
    const imgProducer = document.getElementById('img_producer');
    const arrayFields = [
        'synopsis',
        'director',
        'producer',
        'company',
        'script',
        'country',
        'genre',
        'duration',
        'budget',
        'language',
        'biographyDirector',
        'biographyProducer',
    ];
    const arrayFieldsEn = [
        'synopsisEn',
        'director',
        'producer',
        'company',
        'script',
        'countryEn',
        'genreEn',
        'duration',
        'budget',
        'languageEn',
        'biographyDirectorEn',
        'biographyProducerEn',
    ];

    const newsImg = document.getElementById('news_img');
    const arrayFieldsNews = ['title', 'abstract', 'body'];
    const arrayFieldsNewsEn = ['titleEN', 'abstractEN', 'bodyEN'];

    const resetProjectModalLanguage = (language) => {
        const spanishOnlyFields = ['synopsis', 'country', 'genre', 'language', 'biographyDirector', 'biographyProducer'];
        const englishOnlyFields = ['synopsisEn', 'countryEn', 'genreEn', 'languageEn', 'biographyDirectorEn', 'biographyProducerEn'];
        const fieldsToHide = language == 'es' ? englishOnlyFields : spanishOnlyFields;

        [...spanishOnlyFields, ...englishOnlyFields].forEach((field) => {
            const modalElement = document.getElementById(field);
            if (modalElement) {
                modalElement.textContent = '';
            }
        });

        fieldsToHide.forEach((field) => {
            const elementWrapper = document.getElementsByClassName(`wrapper_${field}`)[0];
            elementWrapper?.classList?.add('d-none');
        });
    };

    const updateProjectModalLabels = (language) => {
        Object.entries(sharedFieldLabels[language] ?? {}).forEach(([field, label]) => {
            if (field == 'back') {
                const backButton = document.querySelector('#modalProyecto .modal-footer .btn');
                if (backButton) {
                    backButton.textContent = label;
                }
                return;
            }

            const wrapper = document.getElementsByClassName(`wrapper_${field}`)[0];
            const strong = wrapper?.querySelector('strong');

            if (strong) {
                strong.textContent = label;
            }
        });
    };

    const runExceptions = (project, field) => {
        if (project.project == 'el-arte-guerra') {
            if (field == 'biographyDirector') {
                const label = document.getElementsByClassName('wrapper_biographyDirector')[0]?.querySelector('strong');
                if (label) {
                    label.innerHTML = 'Biografía directores/productores:';
                }
            } else if (field == 'biographyDirectorEn') {
                const label = document.getElementsByClassName('wrapper_biographyDirectorEn')[0]?.querySelector('strong');
                if (label) {
                    label.innerHTML = "Director's/Producer's biography:";
                }
            }
        }
    };

    const resetExceptions = (language) => {
        if (language == 'es') {
            document.getElementsByClassName('wrapper_biographyDirector')[0]?.querySelector('strong')?.replaceChildren('Biografía director/a:');
        } else if (language == 'en') {
            document.getElementsByClassName('wrapper_biographyDirectorEn')[0]?.querySelector('strong')?.replaceChildren("Director's biography:");
        }
    };

    const setFieldsContent2025 = (fields, project) => {
        fields.forEach((field) => {
            const modalElement = document.getElementById(field);
            const elementWrapper = document.getElementsByClassName(`wrapper_${field}`)[0];
            const elementData = project[field];

            if (!modalElement) {
                return;
            }

            modalElement.textContent = '';

            if (elementData && elementData != '-') {
                runExceptions(project, field);
                elementWrapper?.classList?.remove('d-none');
                modalElement.innerHTML = elementData;
            } else {
                elementWrapper?.classList?.add('d-none');
            }
        });
    };

    const manageImage = (project, imageElement, member, urlField, imageBasePath) => {
        if (!imageElement) {
            return;
        }

        if (project[urlField]) {
            imageElement.src = `${imageBasePath}/${project[urlField]}.jpg`;
            imageElement.setAttribute('alt', project[member]);
            imageElement.className = 'photo-staff mt-4';
        } else {
            imageElement.src = '';
            imageElement.removeAttribute('alt');
            imageElement.className = 'd-none';
        }
    };

    const setModalContent2025 = (project, language, imageBasePath) => {
        if (!project || !section || !img) {
            return;
        }

        section.textContent = sectionLabels[language]?.[project.section] ?? 'Sección';
        img.src = `${imageBasePath}/${project.project}.jpg`;
        img.setAttribute('alt', project.title);

        if (title) {
            title.textContent = '';
        }

        if (titleEn) {
            titleEn.textContent = '';
        }

        resetExceptions(language);
        resetProjectModalLanguage(language);
        updateProjectModalLabels(language);

        if (language == 'es') {
            if (title) {
                title.textContent = project.title ?? 'Título';
            }
            setFieldsContent2025(arrayFields, project);
        } else if (language == 'en') {
            if (titleEn) {
                titleEn.textContent = project.titleEn ?? 'Title';
            }
            setFieldsContent2025(arrayFieldsEn, project);
        }

        manageImage(project, imgDirector, 'director', 'imageDirectorUrl', imageBasePath);
        manageImage(project, imgProducer, 'producer', 'imageProducerUrl', imageBasePath);
    };

    const setFieldsNewsContent = (fields, news) => {
        fields.forEach((field) => {
            const targetField = field.replace(/EN$/, '');
            const modalElement = document.getElementById(`news_${targetField}`);

            if (modalElement) {
                modalElement.innerHTML = news[field];
            }
        });
    };

    const setModalNewsContent = (news, language) => {
        if (!news || !newsImg) {
            return;
        }

        newsImg.src = `${baseUrl}/images/${news.image}`;
        newsImg.alt = language == 'en' ? news.titleEN : news.title;

        if (language == 'es') {
            setFieldsNewsContent(arrayFieldsNews, news);
        } else if (language == 'en') {
            setFieldsNewsContent(arrayFieldsNewsEn, news);
        }
    };

    document.addEventListener('click', (event) => {
        const projectTrigger = event.target.closest('[data-project-2025]');
        if (projectTrigger) {
            event.preventDefault();
            const projectName = projectTrigger.getAttribute('data-project-2025');
            const language = projectTrigger.getAttribute('data-lang');

            void (async () => {
                const projectsData2025 = await getProjectsData2025();
                const project = projectsData2025.find((element) => element.project == projectName);
                setModalContent2025(project, language, `${baseUrl}/images/proyectos-2025`);
            })();
        }

        const projectTrigger2026 = event.target.closest('[data-project-2026]');
        if (projectTrigger2026) {
            event.preventDefault();
            const projectName = projectTrigger2026.getAttribute('data-project-2026');
            const language = projectTrigger2026.getAttribute('data-lang');

            void (async () => {
                const projectsData2026 = await getProjectsData2026();
                const project = projectsData2026.find((element) => element.project == projectName);
                setModalContent2025(project, language, `${baseUrl}/images/proyectos-2026`);
            })();
        }

        const newsTrigger = event.target.closest('[data-news]');
        if (newsTrigger) {
            event.preventDefault();
            const newsName = newsTrigger.getAttribute('data-news');
            const language = newsTrigger.getAttribute('data-lang');

            void (async () => {
                const newsData = await getNewsData();
                const news = newsData.find((element) => element.news == newsName);
                setModalNewsContent(news, language);
            })();
        }
    });

    const projectName = new URLSearchParams(window.location.search).get('p');
    if (projectName) {
        setTimeout(() => {
            const button = document.querySelector(`[data-project-2025="${projectName}"], [data-project-2026="${projectName}"]`);
            button?.click();
        }, 0);
    }
});
