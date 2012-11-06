<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <h2>Usuarios</h2>
    <table id="table_ppal">
    	<thead>
      <tr>
        <th>Logins</th>
        <th>Peticiones</th>
        <th>%</th>
      </tr>
      </thead>
      <tbody>
      <xsl:for-each select="root/Usuarios/Usuario">
      <tr>
        <td><xsl:value-of select="@name"/></td>
        <td><xsl:value-of select="."/></td>
        <td><xsl:value-of select="."/></td>
      </tr>
      </xsl:for-each>
      </tbody>
      <tfoot></tfoot>
    </table>
</xsl:template>
</xsl:stylesheet>