<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <h2>Categorys denied</h2>
    <table id="table_categorys">
    	<thead>
      <tr>
        <th>Logins</th>
        <th>Peticiones</th>
      </tr>
      </thead>
      <tbody>
      <xsl:for-each select="totals/logins/login">
      <tr>
        <td><xsl:value-of select="@name"/></td>
        <td><xsl:value-of select="."/></td>
      </tr>
      </xsl:for-each>
      </tbody>
      <tfoot></tfoot>
    </table>
</xsl:template>
</xsl:stylesheet>