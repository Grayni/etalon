export const scrollPack = {
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > 60) this.isActive = true
      else this.isActive = false
    }
  }
}

export const widthWatch = {
  data() {
    return {
      width: null
    }
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateWidth)
    this.updateWidth()
  }
}

export const transliter = {
  methods: {
    translit(str) {
      let ru = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
          'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 
          'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 
          'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 
          'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 
          'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
      }

      let n_str = []

      str = str.replace(/й/g, 'i')
               .replace(/\s/g, '_')
               .replace(/[ъь«».,\/#!$%\^&\*;:{}=\-`~()\?]/g,'')
               .toLowerCase()

      for (let key of str) {
        if (ru[key]) n_str.push(ru[key])
        else n_str.push(key)
      }

      return n_str.join('');
    }
  }
}

export const validateForm = {
  data() {
    return {
      rules: {
        name: [
          {
            type: 'string',
            required: true,
            min: 2,
            message: 'Минимальное количество символов 2',
            trigger: 'blur'
          }, {
            pattern: /^[a-zа-я\s]+$/gi,
            message: 'Имя должно состоять только из пробелов и букв',
            trigger: 'blur'
          }, {
            max: 30,
            message: 'Максимальное количество символов 30',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            min: 15,
            required: true,
            message: 'Введите номер полностью',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'Пожалуйста, введите Ваш Email',
            trigger: 'blur'
          }, {
            type: 'email',
            message: 'Пожалуйста, введите корректный Email',
            trigger: ['blur', 'change']
          }
        ],
        agree: [
          {
            type: 'array',
            required: true,
            message: 'Для отправки Вам необходимо дать свое согласие на обработку персональных данных',
            trigger: 'change'
          }
        ],
        text: [
          {required: true, message: 'Введите Ваш комментарий', trigger: 'blur'}
        ],
        login: [
          {
            required: true, message: 'Введите логин', trigger: 'blur'
          }
        ],
        pass: [
          {
            required: true, message: 'Введите пароль', trigger: 'blur'
          }, {
            min: 6, message: 'Длина пароля должна быть не меньше 6 символов', trigger: 'blur'
          }
        ],
        article: [
          {
            required: true, message: 'Поле текста должно быть заполнено', trigger: 'blur'
          }
        ],
        title: [
          {
            required: true, message: 'Название обязательно', trigger: 'blur'
          }
        ],
        price: [
          {
            required: true, message: 'Цена обязательна', trigger: 'blur'
          }
        ],
        section: [
          {
            required: true, message: 'Раздел должен быть выбран', trigger: 'blur'
          }
        ]
      }
    }
  }
}

export const validateId = {
  validate({ params }) {
    return Boolean(params.id)
  }
}

export const questionSections = {
  data() {
    return {
      options: [
        {
          value: 'Option1',
          label: 'О компании'
        }, {
          value: 'Option2',
          label: 'О сотрудничестве'
        }, {
          value: 'Option3',
          label: 'О ценах и порядке оплаты'
        }, {
          value: 'Option4',
          label: 'Об ответственности'
        }, {
          value: 'Option5',
          label: 'О тарифах'
        }, {
          value: 'Option6',
          label: 'Про налоговую оптимизацию'
        }, {
          value: 'Option7',
          label: 'Про кадры'
        }, {
          value: 'Option8',
          label: 'О восстановлении учета'
        }, {
          value: 'Option9',
          label: 'Про финансовые консультации'
        }, {
          value: 'Option10',
          label: 'О регистрации организации(ип)'
        }, {
          value: 'Option11',
          label: 'О "нулевке"'
        }, {
          value: 'Option12',
          label: 'О задолженностях'
        }
      ]
    }
  },
}

export const setError = {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      if (value.response.data.message) {
        this.$message({
          type: 'error',
          showClose: true,
          message: value.response.data.message,
          center: true
        })
      }
    }
  }
}