package app.metatron.discovery.domain.dataconnection.accessor;

import app.metatron.discovery.extension.dataconnection.jdbc.accessor.AbstractJdbcDataAccessor;
import org.pf4j.Extension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Extension
public class Neo4jDataAccessor extends AbstractJdbcDataAccessor {
    private static final Logger LOGGER = LoggerFactory.getLogger(Neo4jDataAccessor.class);
}
