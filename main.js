app.component('base-component', {
    data() {
        return {
            MapperList,
            MapperOptions,
            requirements: [],
            tipVisibility: [],
            feasibleMappers: [],
            hideUnavailableMappers: false,
            mapperProblems: []
        }
    },
    created: function() {
        const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));
        this.MapperOptions.forEach(option => {
            // Default everything to don't care.
            if (urlParams[option.field]) {
                const p = urlParams[option.field];
                let value = p;
                if (p === 'true' || p === 'false') { value = p === 'true' }
                else if (p === 'null') { value = null }
                else { value = parseInt(p, 10); }
                this.requirements[option.field] = value;
            } else {
                this.requirements[option.field] = option.defaultOption ?? null;
            }
            this.tipVisibility[option.field] = false;
        });
        this.recalculateFeasibleMappers();
        
    },
    mounted: function() {
        document.addEventListener('click', this.outsideClick);
    },
    methods: {
        recalculateFeasibleMappers() {
            let mapperProblems = [];
            let mappers = this.MapperList.filter(mapper => {
                mapperProblems[mapper.name] = {};
                let mapperIsValid = true;
                Object.keys(this.requirements).forEach(fieldName => {
                    const fieldValue = this.requirements[fieldName];
                    const option = this.MapperOptions.find(f => f.field === fieldName);
                    
                    // If it's null, we do not care. Continue.
                    if (fieldValue === null) { return; }

                    if (option.comparison === 'max' && fieldValue > mapper[fieldName]) { mapperIsValid = false; mapperProblems[mapper.name][fieldName] = true; }
                    else if (option.comparison === 'exact' && fieldValue !== mapper[fieldName]) { mapperIsValid = false; mapperProblems[mapper.name][fieldName] = true; }
                    else if (option.comparison === 'min' && fieldValue < mapper[fieldName]) { mapperIsValid = false; mapperProblems[mapper.name][fieldName] = true; }

                });
                return mapperIsValid;
            }).map(m => m.name);

            this.feasibleMappers = mappers;
            this.mapperProblems = mapperProblems;
        },
        updateField(option, v) {
            this.requirements[option.field] = isNaN(v) ? null : v;
            this.recalculateFeasibleMappers();
            this.rebuildUrl();
        },
        mapperOptionValue(mapper, opt) {
            const foundOption = Object.entries(opt.options).find(e => e[1] === mapper[opt.field])
            if (foundOption) {
                return foundOption[0];
            } else {
                console.warn(`[WARNING] mapper ${mapper.name} field ${opt.field} not defined!`);
                return 'Unknown (app error)';
            }
        },
        outsideClick() {
            this.MapperOptions.forEach(option => {
                this.tipVisibility[option.field] = false;
            });
        },
        rebuildUrl() {
            const url = '?' + Object.entries(this.requirements).map(r => r[0] + '=' + r[1]).join('&');
            history.replaceState({}, 'Mapper Picker', url);
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
                    <div class="mappers">
                        <div v-for="option in MapperOptions" class="mapper-container">
                            <div class="card mapper-card">
                                <div class="row card-body">
                                    <div class="col-10">
                                        <div v-if="option.type === 'dropdown'">
                                            <div class="card-title">{{option.name}}</div>
                                            <select class="form-select form-select-sm" v-model="requirements[option.field]" v-on:change="updateField(option, parseInt($event.target.value, 10))">
                                                <option v-for="(v, k) in option.options" v-bind:value="v">{{k}}</option>
                                            </select>
                                        </div>
                                        <div v-else-if="option.type === 'radio'">
                                            <div class="card-title">{{option.name}}</div>
                                            <div v-for="(v, k) in option.options" class="form-check">
                                                <input class="form-check-input" type="radio" v-model="requirements[option.field]" v-bind:name="option.field" v-bind:id="option.field + '-' + v" v-bind:value="v" v-bind:checked="requirements[option.field] === v" v-on:change="updateField(option, v)">
                                                <label class="form-check-label" v-bind:for="option.field + '-' + v">{{k}}</label>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <strong style="color: red">UNKNOWN TYPE {{option.type}}</strong>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-info btn-sm info-btn" v-on:click="tipVisibility[option.field] = !tipVisibility[option.field]; $event.stopPropagation();">Info</button>
                                    </div>
                                </div>
                            </div>

                            <div class="card info-area" v-show="tipVisibility[option.field]" v-on:click="$event.stopPropagation();"><!-- Prevent clicks inside from closing the dialog -->
                                <div class="card-header">{{option.name}}</div>
                                <div class="card-body">
                                    {{option.description}}
                                </div>
                            </div>
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
                    <div class="accordion mapper-accordion" v-for="mapper in MapperList" v-show="feasibleMappers.includes(mapper.name) || !hideUnavailableMappers">
                        <div class="accordion-item">
                            <h2 class="accordion-header" v-bind:id="'accordion-' + mapper.id">
                                <button class="accordion-button collapsed bg-opacity-50" v-bind:class="{'bg-success': feasibleMappers.includes(mapper.name), 'bg-secondary': !feasibleMappers.includes(mapper.name)}" type="button" data-bs-toggle="collapse" v-bind:data-bs-target="'#accordion-collapse-' + mapper.id" aria-expanded="true" aria-controls="collapseOne">
                                    {{ mapper.name }}
                                </button>
                            </h2>
                            <div v-bind:id="'accordion-collapse-' + mapper.id" class="accordion-collapse collapse" v-bind:aria-labelledby="'accordion-' + mapper.id">
                            <div class="accordion-body">
                                <ul>
                                    <li v-for="opt in MapperOptions" v-bind:class="{'text-danger': mapperProblems[mapper.name][opt.field]}">{{opt.name}}: <strong>{{mapperOptionValue(mapper, opt)}}</strong></li>
                                </ul>
                                <p>{{mapper.notes}}</p>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
        <footer>
            Copyright 2022 <a href="https://indiegameweb.com" target="_blank">IndieGameWeb</a>. (<a href="https://github.com/cppchriscpp/nes-mapper-picker" target="_blank">View on GitHub</a>)
        </footer>
    `
});
app.mount("#app")
