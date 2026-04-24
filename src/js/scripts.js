document.addEventListener('DOMContentLoaded', () => {
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

    const baseUrl = '';
    const section = document.getElementById('section');
    const title = document.getElementById('title');
    const titleEn = document.getElementById('title_en');
    const img = document.getElementById('img');
    const arrayFields = [
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
    ];

    const btnTickets = document.getElementById('sem__url');
    const imgColaborator = document.getElementById('sem__colaborator');
    const imgPonente = document.getElementById('sem__ponente');
    const arraySeminarFields = [
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
    ];

    const setModalContent = (project) => {
        if (!project || !section || !title || !titleEn || !img) {
            return;
        }

        section.textContent = sectionLabels[project.section] ?? 'Sección';
        title.textContent = project.title ?? 'Título';
        titleEn.textContent = project.title_en != project.title ? project.title_en : '';
        img.src = `${baseUrl}/images/proyectos/${project.image}`;
        setFieldsContent(arrayFields, project);
    };

    const setModalSeminarContent = (seminar) => {
        if (!seminar || !imgColaborator || !imgPonente || !btnTickets) {
            return;
        }

        setSeminarFieldsContent(arraySeminarFields, seminar);
        imgColaborator.src = `${baseUrl}/images/${seminar.colaboratorUrl}`;
        imgColaborator.alt = seminar.activity ? `Colaborador de ${seminar.activity}` : 'Colaborador';
        imgPonente.src = `${baseUrl}/images/${seminar.photoUrl}`;
        imgPonente.alt = seminar.subtitle || seminar.title || 'Ponente';
        btnTickets.href = seminar.url;
    };

    const setFieldsContent = (fields, project) => {
        fields.forEach((field) => {
            const modalElement = document.getElementById(field);
            const elementWrapper = document.getElementsByClassName(`wrapper_${field}`)[0];
            const elementData = project[field];

            if (!modalElement) {
                return;
            }

            modalElement.textContent = '';

            if (elementData && elementData != '-') {
                elementWrapper?.classList?.remove('d-none');
                modalElement.innerHTML = elementData;
            } else {
                elementWrapper?.classList?.add('d-none');
            }
        });
    };

    const setSeminarFieldsContent = (fields, seminar) => {
        fields.forEach((field) => {
            const modalSeminarElement = document.getElementById(`sem__${field}`);
            const elementWrapper = document.getElementsByClassName(`wrapper_${field}`)[0];
            const elementData = seminar[field];

            if (!modalSeminarElement) {
                return;
            }

            if (field != 'url') {
                modalSeminarElement.textContent = '';
            }

            if (elementData && elementData != '-') {
                elementWrapper?.classList?.remove('d-none');

                if (field == 'date') {
                    modalSeminarElement.innerHTML = formatDate(elementData);
                } else if (field != 'url') {
                    modalSeminarElement.innerHTML = elementData;
                }
            } else {
                elementWrapper?.classList?.add('d-none');
            }
        });
    };

    const formatDate = (originalDate) => {
        const date = new Date(originalDate);

        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
        });
    };

    document.addEventListener('click', (event) => {
        const projectTrigger = event.target.closest('[data-project]');
        if (projectTrigger) {
            const projectName = projectTrigger.getAttribute('data-project');

            void (async () => {
                const projectsData = await getProjectsData();
                const project = projectsData.find((element) => element.project == projectName);
                setModalContent(project);
            })();
        }

        const seminarTrigger = event.target.closest('[data-seminar]');
        if (seminarTrigger) {
            const seminarName = seminarTrigger.getAttribute('data-seminar');

            void (async () => {
                const seminarsData2025 = await getSeminarsData();
                const seminar = seminarsData2025.find((element) => element.seminar == seminarName);
                setModalSeminarContent(seminar);
            })();
        }
    });

    const projectName = new URLSearchParams(window.location.search).get('p');
    if (projectName) {
        setTimeout(() => {
            const button = document.querySelector(`[data-project="${projectName}"]`);
            button?.click();
        }, 0);
    }
});
