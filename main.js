app.component('base-component', {
    data() {
        return {
            MapperList,
            MapperOptions,
            requirements: [],
            feasibleMappers: [],
            hideUnavailableMappers: false
        }
    },
    created: function() {
        this.MapperOptions.forEach(option => {
            // Default everything to don't care.
            this.requirements[option.field] = null;
        });
        this.recalculateFeasibleMappers();
    },
    methods: {
        recalculateFeasibleMappers() {
            let mappers = this.MapperList.filter(mapper => {
                let mapperIsValid = true;
                Object.keys(this.requirements).forEach(fieldName => {
                    const fieldValue = this.requirements[fieldName];
                    const option = this.MapperOptions.find(f => f.field === fieldName);
                    
                    // If it's null, we do not care. Continue.
                    if (fieldValue === null) { return; }

                    if (option.comparison === 'max' && fieldValue > mapper[fieldName]) { mapperIsValid = false; }
                    else if (option.comparison === 'exact' && fieldValue !== mapper[fieldName]) { mapperIsValid = false; }

                });
                return mapperIsValid;
            }).map(m => m.name);

            this.feasibleMappers = mappers;
        },
        updateField(option, v) {
            this.requirements[option.field] = v;
            console.info('updated', this.requirements, arguments);
            this.recalculateFeasibleMappers();
        }
    },
    // NOTE: Use es6-string-html module for vs code to make this highlight
    template: /*html*/`
        <div class="container">
            <div class="row">
                <div class="col">
                    <h1>NES Mapper Picker</h1>
                </div>
            </div>
            <div class="row align-items-start">
                <div class="col-sm-6 col-md-8 col-lg-8">
                    <h3>Requirements</h3>
                    <div v-for="option in MapperOptions">
                        <div v-if="option.type === 'dropdown'">
                            <strong>{{option.name}}:</strong>
                            <select class="form-select" v-on:change="updateField(option, parseInt($event.target.value, 10))">
                                <option v-for="(v, k) in option.options" v-bind:value="v">{{k}}</option>
                            </select>
                        </div>
                        <div v-else-if="option.type === 'radio'">
                            <strong>{{option.name}}</strong>: 
                            <div v-for="(v, k) in option.options" class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-bind:name="option.field" v-bind:id="option.field + '-' + v" v-bind:value="v" v-bind:checked="requirements[option.field] === v" v-on:change="updateField(option, v)">
                                <label class="form-check-label" v-bind:for="option.field + '-' + v">{{k}}</label>
                            </div>
                        </div>
                        <div v-else>
                            <strong style="color: red">UNKNOWN TYPE {{option.type}}</strong>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4">
                    <h3>Available Mappers</h3>
                    <p>Mappers with a green background will meet your needs.</p>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="hide-mappers" v-bind:value="true" v-model="hideUnavailableMappers">
                        <label class="form-check-label" for="hide-mappers">Hide Unusable mappers</label>

                    </div>
                    <div class="accordion" v-for="mapper in MapperList" v-show="feasibleMappers.includes(mapper.name) || !hideUnavailableMappers">
                        <div class="accordion-item">
                            <h2 class="accordion-header" v-bind:id="'accordion-' + mapper.id">
                                <button class="accordion-button collapsed" v-bind:class="{'bg-success': feasibleMappers.includes(mapper.name), 'bg-secondary': !feasibleMappers.includes(mapper.name)}" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#accordion-collapse-' + mapper.id" aria-expanded="true" aria-controls="collapseOne">
                                    {{ mapper.name }}
                                </button>
                            </h2>
                            <div v-bind:id="'accordion-collapse-' + mapper.id" class="accordion-collapse collapse" v-bind:aria-labelledby="'accordion-' + mapper.id">
                            <div class="accordion-body">
                                <ul>
                                    <li v-for="opt in MapperOptions">{{opt.name}}: <strong>{{(Object.entries(opt.options).find(e => e[1] === mapper[opt.field]))[0]}}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    `
});
app.mount("#app")
