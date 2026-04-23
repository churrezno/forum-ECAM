import $ from "jquery";

$(function() {
    let projectsData2025Cache = null;
    let newsDataCache = null;

    const getProjectsData2025 = async () => {
        if (!projectsData2025Cache) {
            const module = await import('./data-projects-2025');
            projectsData2025Cache = module.projectsData2025;
        }

        return projectsData2025Cache;
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


    // OPEN MODAL ON PAGE LOAD WHEN RECEIVING PARAM
    var projectName = window.location.href.split("?p=")[1];
    if (projectName) {
        setTimeout(function() {
            var button = document.querySelector('[data-project-2025="' + projectName + '"]');
            if (button) {
                button.click();
            }
        }, 0);
    }
    
    // FILL MODAL PROJECTS ON GRID ITEM CLICK
    //const baseUrl = 'https://devala.es/devs/ecam-forum',
    const baseUrl = '',
          section = document.getElementById('section'),
          title = document.getElementById('title'),
          titleEn = document.getElementById('titleEn'),
          img = document.getElementById('img'),
          imgDirector = document.getElementById('img_director'),
          imgProducer = document.getElementById('img_producer'),
          arrayFields = [
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
          ],
          arrayFieldsEN = [
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

    const news_img = document.getElementById('news_img'),
          arrayFieldsNews = [
            'title',
            'abstract',
            'body'
          ],
          arrayFieldsNewsEN = [
            'titleEN',
            'abstractEN',
            'bodyEN'
          ];

        
    $('[data-project-2025]').on('click', function() {
        const projectName = $(this).data('project-2025'),
              language = $(this).data('lang');

        void (async () => {
            const projectsData2025 = await getProjectsData2025();
            const project = projectsData2025.find((element) => element.project == projectName);
            setModalContent2025(project, language);
        })();
    });
        
    $('[data-news]').on('click', function() {
        const newsName = $(this).data('news'),
              language = $(this).data('lang');

        void (async () => {
            const newsData = await getNewsData();
            const news = newsData.find((element) => element.news == newsName);
            setModalNewsContent(news, language);
        })();
    });


    function setModalContent2025(project, language) {

        section.textContent = sectionLabels[language]?.[project?.section] ?? 'Sección';
        img.src = baseUrl + '/images/proyectos-2025/' + project?.project + '.jpg';
        img.setAttribute('alt', project.title);
        title.textContent = '';
        titleEn.textContent = '';

        resetExceptions(language);
        resetProjectModalLanguage(language);
        updateProjectModalLabels(language);

        // Set Fields content depending on language
        if (language == 'es') {
            title.textContent = project?.title ?? 'Título';
            setFieldsContent2025(arrayFields, project);
        }
        else if (language == 'en') {
            titleEn.textContent = project?.titleEn ?? 'Title';                                  
            setFieldsContent2025(arrayFieldsEN, project);
        }

        // Show photos if existing
        manageImage(project, imgDirector, 'director', 'imageDirectorUrl');
        manageImage(project, imgProducer, 'producer', 'imageProducerUrl');
    }

    function resetProjectModalLanguage(language) {
        const spanishOnlyFields = ['synopsis', 'country', 'genre', 'language', 'biographyDirector', 'biographyProducer'];
        const englishOnlyFields = ['synopsisEn', 'countryEn', 'genreEn', 'languageEn', 'biographyDirectorEn', 'biographyProducerEn'];
        const fieldsToHide = language == 'es' ? englishOnlyFields : spanishOnlyFields;

        [...spanishOnlyFields, ...englishOnlyFields].forEach((element) => {
            const modalElement = document.getElementById(element);
            if (modalElement) {
                modalElement.textContent = '';
            }
        });

        fieldsToHide.forEach((element) => {
            const elementWrapper = document.getElementsByClassName('wrapper_' + element)[0];
            elementWrapper?.classList?.add('d-none');
        });
    }

    function updateProjectModalLabels(language) {
        Object.entries(sharedFieldLabels[language] ?? {}).forEach(([field, label]) => {
            if (field == 'back') {
                const backButton = document.querySelector('#modalProyecto .modal-footer .btn');
                if (backButton) {
                    backButton.textContent = label;
                }
                return;
            }

            const wrapper = document.getElementsByClassName('wrapper_' + field)[0];
            const strong = wrapper?.querySelector('strong');

            if (strong) {
                strong.textContent = label;
            }
        });
    }


    function setModalNewsContent(news, language) {

        news_img.src = baseUrl + '/images/' + news?.image;
        
        // Set Fields content depending on language
        if (language == 'es')
            setFieldsNewsContent(arrayFieldsNews, news);
        else if (language == 'en')
            setFieldsNewsContent(arrayFieldsNewsEN, news);                            
    }

    
    function setFieldsContent2025(array, project) {
        
        array.forEach(element => {
            const modalElement = document.getElementById(element);
            const elementWrapper = document.getElementsByClassName('wrapper_' + element)[0];
            const elementData = project[`${element}`];
            
            modalElement.textContent = '';

            if (elementData && elementData != '-') {
                runExceptions(project, element);
                elementWrapper?.classList?.remove('d-none');                
                modalElement.innerHTML = elementData;
            } else {
                elementWrapper?.classList?.add('d-none');
            }
        });
    }

    function manageImage(project, img, member, url) {
        if(project[`${url}`]) {
            img.src = baseUrl + '/images/proyectos-2025/' + project[`${url}`] + '.jpg';
            img.setAttribute('alt', project[`${member}`]);
            img.classList = 'photo-staff mt-4';
        } else {
            img.src = '';
            img.removeAttribute('alt');
            img.classList = 'd-none';
        }
    }

    function runExceptions(project, element) {
        if (project.project == 'el-arte-guerra' ) {
            if (element == 'biographyDirector') {
                let el = document.getElementsByClassName('wrapper_biographyDirector')[0].querySelector('strong');
                return el.innerHTML = 'Biografía directores/productores:';
            } else if (element == 'biographyDirectorEn') {
                let el = document.getElementsByClassName('wrapper_biographyDirectorEn')[0].querySelector('strong');
                return el.innerHTML = "Director's/Producer's biography:";
            }
        }
    }

    function resetExceptions(language) {
        if (language == 'es')
            document.getElementsByClassName('wrapper_biographyDirector')[0].querySelector('strong').innerHTML = 'Biografía director/a:';
        else if (language == 'en')
            document.getElementsByClassName('wrapper_biographyDirectorEn')[0].querySelector('strong').innerHTML = "Director's biography:";
    }

    
    function setFieldsNewsContent(array, news) {
        
        array.forEach(element => {
            const targetField = element.replace(/EN$/, '');
            const modalElement = document.getElementById('news_' + targetField);
            const elementData = news[`${element}`];

            if (modalElement) {
                modalElement.innerHTML = elementData;
            }
        });
    }

});
