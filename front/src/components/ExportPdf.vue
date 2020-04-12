<template>
  <div>
    <button @click="exportPdfWithImage()">Export PDF With Image</button>
    <button @click="exportPdfWithHtml()">Export PDF With Html</button>
  </div>
</template>
<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    exportPdfWithImage: function() {
      window.scrollTo(0,0);
      html2canvas(document.getElementById(this.id)).then(function (canvas) {
        const img = canvas.toDataURL("image/png");
        const doc = new jsPDF('p', 'pt', 'a1');
        doc.addImage(img, 'JPEG', 115, 40);
        doc.save('docImage.pdf');
      });
    },
    exportPdfWithHtml: function() {
      const doc = new jsPDF();
      const elementHTML = document.getElementById(this.id)

      doc.fromHTML(elementHTML, 15, 15);

      doc.save('docHtml.pdf');
    }
  }
};
</script>
<style>
  
</style>