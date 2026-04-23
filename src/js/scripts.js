import $ from "jquery";

$(function() {
    let projectsDataCache = null;
    let seminarsDataCache = null;

    const sectionLabels = {
        1: 'Last push',
        2: 'Films to come',
        3: 'Series',
        4: 'After',
    };

    const getProjectsData = async () => {
        if (!projectsDataCache) {
            const module = await import('./data-projects');
            projectsDataCache = module.projectsData;
        }

        return projectsDataCache;
    };

    const getSeminarsData = async () => {
        if (!seminarsDataCache) {
            const module = await import('./data-seminarios-2025');
            seminarsDataCache = module.seminarsData2025;
        }

        return seminarsDataCache;
    };

    // OPEN MODAL ON PAGE LOAD WHEN RECEIVING PARAM
    var projectName = window.location.href.split("?p=")[1];
    if (projectName) {
        setTimeout(function() {
            var button = document.querySelector('[data-project="' + projectName + '"]');
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
          title_en = document.getElementById('title_en'),
          img = document.getElementById('img'),
          arrayFields = [
                'synopsis',
                'synopsis_en',
                'director',
                'producer',
                'company',
                'script',
                'country',
                'country_en',
                'genre',
                'genre_en',
                'duration',
                'budget',
                'budget_acquired',
                'searching',
                'searching_en',
                'intention',
                'intention_en',
                'biography',
                'biography_en',
                'filmography',
                'company_profile',
                'company_profile_en',
                'company_filmography',
          ]

    const btn_tickets = document.getElementById('sem__url'),
          imgColaborator = document.getElementById('sem__colaborator'),
          imgPonente = document.getElementById('sem__ponente'),
          arraySeminarFields = [
                'activity',
                'location',
                'date',
                'time',
                'url',
                'colaborator',
                'title',
                'subtitle',
                'subtitleEn',
                'text',
                'textEn',
                'bio',
                'bioEn',
          ]

        
    $('[data-project]').on('click', function() {
        const projectName = $(this).data('project');
        void (async () => {
            const projectsData = await getProjectsData();
            const project = projectsData.find((element) => element.project == projectName);
            setModalContent(project);
        })();
    });
        
    $('[data-seminar]').on('click', function() {
        const seminarName = $(this).data('seminar');
        void (async () => {
            const seminarsData2025 = await getSeminarsData();
            const seminar = seminarsData2025.find((element) => element.seminar == seminarName);
            setModalSeminarContent(seminar);
        })();
    });


    function setModalContent(project) {

        section.textContent = sectionLabels[project?.section] ?? 'Sección';
        title.textContent = project?.title ?? 'Título';
        title_en.textContent = (project?.title_en != project?.title) ?
                                project?.title_en :
                                '';
                                
        img.src = baseUrl + '/images/proyectos/' + project?.image;
        setFieldsContent(arrayFields, project);
    }


    function setModalSeminarContent(seminar) {

        setSeminarFieldsContent(arraySeminarFields, seminar);
        imgColaborator.src = baseUrl + '/images/' + seminar?.colaboratorUrl;
        imgPonente.src = baseUrl + '/images/' + seminar?.photoUrl;
        btn_tickets.href = seminar.url;
    }

    
    function setFieldsContent(array, project) {
        
        array.forEach(element => {
            const modalElement = document.getElementById(element);
            const elementWrapper = document.getElementsByClassName('wrapper_' + element)[0];
            const elementData = project[`${element}`];
            
            modalElement.textContent = '';

            if (elementData && elementData != '-') {
                elementWrapper?.classList?.remove('d-none');                
                modalElement.innerHTML = elementData;
            } else {
                elementWrapper?.classList?.add('d-none');
            }
        });
    }

    
    function setSeminarFieldsContent(array, seminar) {
        
        array.forEach(element => {
            const modalSeminarElement = document.getElementById('sem__' + element);
            const elementWrapper = document.getElementsByClassName('wrapper_' + element)[0];
            const elementData = seminar[`${element}`];

            if (element != 'url')
                modalSeminarElement.textContent = '';       

            if (elementData && elementData != '-') {
                elementWrapper?.classList?.remove('d-none');  
                if (element == 'date') 
                    modalSeminarElement.innerHTML = formatDate(elementData);
                else if (element != 'url')
                    modalSeminarElement.innerHTML = elementData;
            } else {
                elementWrapper?.classList?.add('d-none');
            }
        });
    }


    function formatDate(originalDate) {
        const date = new Date(originalDate);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
        });
    }
});
