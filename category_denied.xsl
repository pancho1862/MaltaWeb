<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="total">
<xsl:value-of select="datos/Categoria_denegadas/Categoria_denegadas_hits"></xsl:value-of>
</xsl:variable>

<xsl:template match="/">
  <h2>Categorias denegadas</h2>
    <table id="table_ppal">
    	<thead>
      <tr>
        <th>Logins</th>
        <th>Peticiones</th>
        <th>%</th>
      </tr>
      </thead>
      <tbody>
      
      <xsl:for-each select="datos/Categoria_denegadas/Categoria_denegada">
      <tr>
        <td><xsl:value-of select="@name"/></td>
        <td><xsl:value-of select="."/></td>
        <td><xsl:value-of select=" round( . div $total * 10000) div 100 "/></td>
      </tr>
      </xsl:for-each>
      </tbody>
      <tfoot></tfoot>
    </table>
</xsl:template>
</xsl:stylesheet>