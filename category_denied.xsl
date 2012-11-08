<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:variable name="total">
<xsl:value-of select="root/Categoria_denegadas/Categoria_denegadas_hits"></xsl:value-of>
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
      <xsl:variable name="others">
		<xsl:value-of select="0"></xsl:value-of>
	</xsl:variable>
      <xsl:for-each select="root/Categoria_denegadas/Categoria_denegada">
	<xsl:variable name="porcentaje">
		<xsl:value-of select="round( @hits div $total * 10000) div 100"></xsl:value-of>
	</xsl:variable>
    
      <tr>
        <td><xsl:value-of select="@name"/>
        <xsl:if test="$porcentaje &gt;= 5">
        <script language="JavaScript" type="text/javascript" >
          graphData.push(['<xsl:value-of select="@name"/>', <xsl:value-of select="@hits"/>]);
        </script>
        </xsl:if>
    <xsl:if test="$porcentaje &lt; 5">
        <script language="JavaScript" type="text/javascript" >
          others = others + <xsl:value-of select="@hits"/>;
        </script>
    </xsl:if>
         </td>
        <td><xsl:value-of select="@hits"/></td>
        <td><xsl:value-of select=" $porcentaje "/></td>
      </tr>
      </xsl:for-each>
      </tbody>
      <tfoot></tfoot>
    </table>
</xsl:template>
</xsl:stylesheet>