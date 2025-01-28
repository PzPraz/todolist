import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns'

function createTaskManager() {
    function generateUniqueID() {
        return 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }
    return {
        tasks: [{
                name:'HEYYA!!', 
                duedate:'2000-3-15', 
                isComplete: false, 
                details: `I'm the creator of this website`, 
                categories: null,
                project: 'Getting Started', 
                id: generateUniqueID()}],

        projects: [{name: 'Getting Started'}],
        
        addTask(taskName, duedate, taskDetails, projectName, taskPriority){
            const task = {
                name: taskName,
                duedate: parseISO(duedate),
                isComplete: false,
                details: taskDetails,
                categories: this.categorizeTask({ duedate: parseISO(duedate) }),
                project: projectName,
                id: generateUniqueID(),
                priority: taskPriority
            };

            this.tasks.push(task);

        },
        
        getTask(){
            return this.tasks
        },

        
        getTasksByCategory(category) {
            return this.tasks.filter(task => task.categories.includes(category));
        },

        getTodayTasks(){
            return this.getTasksByCategory('today')
        },

        getWeekTasks(){
            return this.getTasksByCategory('week')
        },

        getMonthTasks(){
            return this.getTasksByCategory('month')
        },

        toggleComplete(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isComplete =  task.isComplete ? false :  true

        },

        editTask(task, name, duedate, details, priority){
            task.name = name
            task.duedate = parseISO(duedate)
            task.details = details
            task.priority = priority

        },
        
        removeTask(id){
            this.tasks = this.tasks.filter(t => t.id !== id)
        },

        categorizeTask(task) {
            const categories = [];
            if (isToday(task.duedate)) categories.push('today');
            if (isThisWeek(task.duedate)) categories.push('week');
            if (isThisMonth(task.duedate)) categories.push('month');
            return categories;
        },

        addProject(projectName){
            if(this.projects.some(p => p.name === projectName)){
                return
            } else{
                this.projects.push({
                    name: projectName
                })
            }
        },

        getProjectTasks(projectName){
            return this.tasks.filter(t => t.project === projectName)

        },
        
        removeProject(projectName){
            this.tasks = this.tasks.filter(task => task.project !== projectName)
            this.projects = this.projects.filter(p => p.name !== projectName)
        },

        findProject(projectName){
            const project = this.projects.find(p => p.name === projectName)

            return project
        },

        getTaskById(id){
            return this.tasks.find(t => t.id === id)
        },

        saveToJson() {
            const data = {
                tasks: this.tasks.map(task => ({
                    ...task,
                    duedate: task.duedate.toISOString() // Convert to ISO string
                })),
                projects: this.projects 
            };
            return JSON.stringify(data);
        },

        loadFromJson(jsonString) {
            const data = JSON.parse(jsonString);
            this.tasks = data.tasks.map(task => ({
                ...task,
                duedate: parseISO(task.duedate) // Convert ISO string back to Date
            }));
            this.projects = data.projects; 
        },
        
        

    }
}

const Task = createTaskManager()

export { Task }