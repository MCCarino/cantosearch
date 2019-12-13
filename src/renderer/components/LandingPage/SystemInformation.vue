<template>
  <div class="doc">
    <div class="title">Translate</div>
    <div class="items">
      <div class="item">
        <div class="name">
          <label for="criterion">Enter Phrase:</label>
        </div>
        <div class="value">
          <input
            id="criterion"
            v-model="criterion"
            v-on:keyup="getCantonese"
            v-on:blur="resetCurr"
            type="text"
            name="criterion" />
        </div>
        <br/>
      </div>
      <div class="item">
        <div class="name">Cantonese:</div>
        <div class="name">{{ translation }}</div>
      </div><br>
      <div class="title">Add Translation</div>
      <div class="item">
        <div class="name">English Word:</div>
        <div class="value">
          <input
            id="engword"
            v-model="engword"
            type="text"
            name="engword" />
        </div>
      </div>
      <div class="item">
        <div class="name">Cantonese Translation:</div>
        <div class="value">
          <input
            id="cantrans"
            v-model="cantrans"
            type="text"
            name="cantrans" />
        </div>
      </div>
    </div>
    <div class="savetrans">
      <button @click="saveCantonese()">Save Translation</button>
    </div>
  </div>
</template>

<script>
  const db = require('../../../../src/main/db');
  const saveTrans = async (eng, chi) => {
    const engWord = await db.wordDb.insert({eng: eng, chi: chi});
    return engWord;
  }
  const getTrans = async (engph) => {
    const proxies = await db.wordDb.find({eng: engph});
    return {proxies};
  }
  export default {
    data () {
      return {
        criterion: null,
        translation: '',
        engword: null,
        cantrans: null,
        currWord: ''
      }
    },
    props: {
      doCheck: Boolean
    },
    methods: {
      getCantonese: function (e) {
        var keyp = String.fromCharCode((e.which) ? e.which : e.keyCode);
        if (/\s/.test(keyp)) {
          this.checkTranslation();
        } else if(/[A-Za-z]/.test(keyp)) {
          this.currWord += keyp;
        }
      },
      checkTranslation: function () {
        var forTrans = this.currWord.toLowerCase();
        var dispTrans = getTrans(forTrans);
        dispTrans.then((doc, err) => {
          if (doc.proxies.length > 0) {
            this.translation += (" " + doc.proxies[0].chi);
          }
          this.resetCurr();
        });
      },
      resetCurr: function () {
        this.currWord = "";
      },
      saveCantonese: function () {
        saveTrans(this.engword, this.cantrans);
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
    width: 35%;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }

  .savetrans {
    margin-top: 15px;
  }

  input[type=text] {
    padding: 3px;
  }

  input[type=text]:focus {
    border-color: #42b983;
    outline: none;
  }

</style>
